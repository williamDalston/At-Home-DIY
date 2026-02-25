export function estimateReadingTime(content: string): {
  minutes: number;
  words: number;
} {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { minutes, words };
}
