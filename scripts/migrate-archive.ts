import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  deriveSlugFromPath,
  prependArchiveWarning,
  transformGatsbyFrontmatter,
  type GatsbyFrontmatter,
} from '../src/lib/migrate-archive.js';

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): { source: string } {
  const sourceIdx = argv.indexOf('--source');
  const source = sourceIdx !== -1 ? argv[sourceIdx + 1] : '../blog';
  if (!source) {
    throw new Error('--source flag provided but no value given');
  }
  return { source };
}

// ---------------------------------------------------------------------------
// Frontmatter parser
// ---------------------------------------------------------------------------
// Parses the simple key: "value" or key: value format used by the Gatsby blog.
// Does not handle nested keys, arrays, or multi-line values — not needed here.

function parseFrontmatter(raw: string): { frontmatter: GatsbyFrontmatter; body: string } {
  // Split on the --- delimiters. The file starts with ---, so splitting on
  // /^---$/m gives ['', <fm block>, <body>].
  const parts = raw.split(/^---\s*$/m);
  if (parts.length < 3) {
    throw new Error('Could not find frontmatter delimiters in file');
  }

  const fmBlock = parts[1];
  const body = parts.slice(2).join('---').trim();

  const record: Record<string, string> = {};
  for (const line of fmBlock.split('\n')) {
    const match = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (match) {
      record[match[1]] = match[2];
    }
  }

  if (!record['title'] || !record['date']) {
    throw new Error(`Missing required frontmatter fields. Got: ${JSON.stringify(record)}`);
  }

  const frontmatter: GatsbyFrontmatter = {
    title: record['title'],
    date: record['date'],
  };

  if (record['description'] !== undefined) {
    frontmatter.description = record['description'];
  }

  return { frontmatter, body };
}

// ---------------------------------------------------------------------------
// Frontmatter serialiser
// ---------------------------------------------------------------------------

function serialiseFrontmatter(fm: {
  title: string;
  date: Date;
  originalUrl: string;
  isLegacy: true;
  description?: string;
}): string {
  const lines: string[] = [
    '---',
    `title: "${fm.title}"`,
    `date: "${fm.date.toISOString()}"`,
    `originalUrl: "${fm.originalUrl}"`,
    `isLegacy: true`,
  ];

  if (fm.description !== undefined) {
    lines.push(`description: "${fm.description}"`);
  }

  lines.push('---');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const { source } = parseArgs(process.argv.slice(2));

  const sourceDir = path.resolve(source);
  const blogDir = path.join(sourceDir, 'src', 'content', 'blog');
  const outputDir = path.resolve('src', 'content', 'archive');

  if (!fs.existsSync(blogDir)) {
    console.error(`Source blog directory not found: ${blogDir}`);
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const postDirs = entries.filter((e) => e.isDirectory());

  for (const dir of postDirs) {
    const indexPath = path.join(blogDir, dir.name, 'index.md');

    if (!fs.existsSync(indexPath)) {
      console.warn(`Skipping ${dir.name}: no index.md found`);
      continue;
    }

    const raw = fs.readFileSync(indexPath, 'utf-8');
    const slug = deriveSlugFromPath(indexPath);

    let frontmatter: GatsbyFrontmatter;
    let body: string;

    try {
      ({ frontmatter, body } = parseFrontmatter(raw));
    } catch (err) {
      console.error(`Failed to parse ${indexPath}: ${String(err)}`);
      continue;
    }

    const archiveFm = transformGatsbyFrontmatter(frontmatter, slug);
    const warningBody = prependArchiveWarning(body);
    const output = `${serialiseFrontmatter(archiveFm)}\n\n${warningBody}\n`;

    const outputPath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(outputPath, output, 'utf-8');

    console.log(`Migrated: ${slug}`);
  }
}

main();
