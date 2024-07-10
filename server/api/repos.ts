import { readFileSync } from "fs";

export default defineEventHandler(() => {
  return JSON.parse(readFileSync("repos-data.json", "utf-8"));
});
