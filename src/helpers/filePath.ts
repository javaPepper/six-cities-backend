import { dirname } from "path"
import { fileURLToPath } from "url"

export function getCurrentDirPath() {
	const filePath = fileURLToPath(import.meta.url);
	return dirname(filePath);
}