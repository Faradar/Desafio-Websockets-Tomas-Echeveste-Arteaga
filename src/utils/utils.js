import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";

// Get the current directory name
const currentDir = dirname(fileURLToPath(import.meta.url));

// Go up one folder level
const parentDir = join(currentDir, "..");

// Now, you can use the `parentDir` variable as the one-folder-up directory
export const __dirname = parentDir;

// export const __dirname = dirname(fileURLToPath(import.meta.url));
