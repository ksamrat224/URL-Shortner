import { promises as fs } from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), ".data");
const dbFile = path.join(dataDir, "url-database.json");

async function ensureDbFile() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dbFile);
  } catch {
    await fs.writeFile(dbFile, "{}", "utf8");
  }
}

async function readDatabase() {
  await ensureDbFile();
  const raw = await fs.readFile(dbFile, "utf8");

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export async function saveShortUrl(id, url) {
  const database = await readDatabase();
  database[id] = url;
  await fs.writeFile(dbFile, JSON.stringify(database, null, 2), "utf8");
}

export async function getOriginalUrl(id) {
  const database = await readDatabase();
  return database[id] ?? null;
}
