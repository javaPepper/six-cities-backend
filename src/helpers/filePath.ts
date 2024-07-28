import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getCurrentDirPath() {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
}
