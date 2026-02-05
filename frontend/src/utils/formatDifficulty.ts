export function formatDifficulty(level: string) {
  if (!level) return "";
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}
