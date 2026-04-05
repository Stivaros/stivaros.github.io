export interface GatsbyFrontmatter {
  title: string;
  date: string;
  description?: string;
}

export interface ArchiveFrontmatter {
  title: string;
  date: Date;
  originalUrl: string;
  isLegacy: true;
  description?: string;
}

const BASE_URL = 'https://blog.stivaros.com';

export function deriveSlugFromPath(filePath: string): string {
  const parts = filePath.split('/');
  // filePath is always .../slug/index.md — the slug is the directory one level up
  return parts[parts.length - 2];
}

export function transformGatsbyFrontmatter(
  frontmatter: GatsbyFrontmatter,
  slug: string,
): ArchiveFrontmatter {
  const result: ArchiveFrontmatter = {
    title: frontmatter.title,
    date: new Date(frontmatter.date),
    originalUrl: `${BASE_URL}/${slug}`,
    isLegacy: true,
  };

  if (frontmatter.description !== undefined) {
    result.description = frontmatter.description;
  }

  return result;
}

