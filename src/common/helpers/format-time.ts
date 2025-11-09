export function formatTime(date: Date): string {
  return date.toTimeString().substring(0, 5);
}