// src/utils/parseError.ts
export const parseError = (err: unknown): string => {
  return err instanceof Error ? err.message : "Something went wrong";
};
