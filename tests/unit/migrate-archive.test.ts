import { describe, expect, it } from 'vitest';
import {
  buildArchiveWarning,
  deriveSlugFromPath,
  prependArchiveWarning,
  transformGatsbyFrontmatter,
} from '@lib/migrate-archive';

describe('transformGatsbyFrontmatter', () => {
  it('transforms a Gatsby ISO date string into a JS Date object', () => {
    const result = transformGatsbyFrontmatter(
      { title: 'My Post', date: '2021-07-13T21:20:13.233Z' },
      'my-post',
    );
    expect(result.date).toBeInstanceOf(Date);
    expect(result.date.toISOString()).toBe('2021-07-13T21:20:13.233Z');
  });

  it('preserves the post title exactly as written', () => {
    const result = transformGatsbyFrontmatter(
      { title: '30-30-30 Rule for Debugging', date: '2021-07-13T21:20:13.233Z' },
      '30-30-30-rule-debugging',
    );
    expect(result.title).toBe('30-30-30 Rule for Debugging');
  });

  it('sets isLegacy to true for all migrated posts', () => {
    const result = transformGatsbyFrontmatter(
      { title: 'Any Post', date: '2021-07-13T21:20:13.233Z' },
      'any-post',
    );
    expect(result.isLegacy).toBe(true);
  });

  it('derives the originalUrl from the post slug', () => {
    const result = transformGatsbyFrontmatter(
      { title: 'My Post', date: '2021-07-13T21:20:13.233Z' },
      '30-30-30-rule-debugging',
    );
    expect(result.originalUrl).toBe('https://blog.stivaros.com/30-30-30-rule-debugging');
  });

  it('includes description when present in Gatsby frontmatter', () => {
    const result = transformGatsbyFrontmatter(
      {
        title: 'My Post',
        date: '2021-07-13T21:20:13.233Z',
        description: 'A tip for developers',
      },
      'my-post',
    );
    expect(result.description).toBe('A tip for developers');
  });

  it('omits description when absent from Gatsby frontmatter', () => {
    const result = transformGatsbyFrontmatter(
      { title: 'My Post', date: '2021-07-13T21:20:13.233Z' },
      'my-post',
    );
    expect(result.description).toBeUndefined();
  });
});

describe('deriveSlugFromPath', () => {
  it('derives the slug from the parent directory name of an index.md file', () => {
    const slug = deriveSlugFromPath('/home/user/blog/src/content/blog/my-post/index.md');
    expect(slug).toBe('my-post');
  });

  it('handles slugs with numbers and hyphens', () => {
    const slug = deriveSlugFromPath('/home/user/blog/src/content/blog/30-30-30-rule-debugging/index.md');
    expect(slug).toBe('30-30-30-rule-debugging');
  });
});

describe('buildArchiveWarning', () => {
  it('returns a blockquote with the archive warning text', () => {
    const warning = buildArchiveWarning();
    expect(warning).toMatch(/^>/);
    expect(warning).toContain('Archive');
    expect(warning).toContain('blog.stivaros.com');
  });
});

describe('prependArchiveWarning', () => {
  it('prepends the archive warning to the post body', () => {
    const body = 'This is the original post content.';
    const result = prependArchiveWarning(body);
    expect(result.startsWith(buildArchiveWarning())).toBe(true);
  });

  it('preserves the original post body content after the warning', () => {
    const body = 'This is the original post content.';
    const result = prependArchiveWarning(body);
    expect(result).toContain(body);
    expect(result.indexOf(body)).toBeGreaterThan(0);
  });
});
