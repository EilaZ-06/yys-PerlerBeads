import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = process.argv[2];
if (!sourceRoot) {
  throw new Error("请提供 74 款九板图纸目录");
}

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public", "gallery", "treasure");
const dataFile = path.join(projectRoot, "src", "data", "treasurePatterns.json");
await mkdir(publicDir, { recursive: true });
await mkdir(path.dirname(dataFile), { recursive: true });

const entries = await readdir(sourceRoot, { withFileTypes: true });
const folders = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));

const patterns = [];
for (const folder of folders) {
  const match = folder.match(/^(\d+)_/);
  if (!match) continue;

  const id = match[1].padStart(2, "0");
  const source = path.join(sourceRoot, folder, "完整图纸_87x87.png");
  const filename = `${id}.png`;
  await copyFile(source, path.join(publicDir, filename));
  patterns.push({
    id,
    title: folder
      .replace(/^\d+_/, "")
      .replace(/_（.*$/, "")
      .replaceAll("_", "·"),
    category: "典藏",
    size: "87×87",
    boards: 9,
    src: `/gallery/treasure/${filename}`,
  });
}

if (patterns.length !== 74) {
  throw new Error(`预期 74 张完整图纸，实际导入 ${patterns.length} 张`);
}

await writeFile(dataFile, `${JSON.stringify(patterns, null, 2)}\n`, "utf8");
console.log(`已导入 ${patterns.length} 张典藏图纸`);
