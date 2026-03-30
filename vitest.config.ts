import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/**'],
      thresholds: {
        // All utility code in src/lib must maintain 100% coverage.
        // This is enforced at the CI level; failing thresholds fail the build.
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
