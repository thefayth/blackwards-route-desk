import { rm } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";

const projectRoot = resolve(process.cwd());
const target = resolve(projectRoot, "dist");

if (dirname(target) !== projectRoot || basename(target) !== "dist") {
  throw new Error(`Refusing to clean unexpected build path: ${target}`);
}

await rm(target, { recursive: true, force: true });
