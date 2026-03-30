import { describe, expect, it } from 'vitest';
import { formatDateForDisplay } from '@lib/date-formatter';

describe('formatDateForDisplay', () => {
  it('formats a JS Date as a human-readable string in the format "13 July 2021"', () => {
    expect(formatDateForDisplay(new Date(2021, 6, 13))).toBe('13 July 2021');
  });

  it('handles single-digit days without zero-padding', () => {
    expect(formatDateForDisplay(new Date(2021, 6, 5))).toBe('5 July 2021');
  });

  it('formats correctly for January (month index 0)', () => {
    expect(formatDateForDisplay(new Date(2021, 0, 1))).toBe('1 January 2021');
  });

  it('formats correctly for December (month index 11)', () => {
    expect(formatDateForDisplay(new Date(2021, 11, 31))).toBe('31 December 2021');
  });
});
