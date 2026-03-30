const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDateForDisplay(date: Date): string {
  return formatter.format(date);
}
