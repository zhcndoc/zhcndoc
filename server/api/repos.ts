import { readFileSync } from "fs";
import { BaseRepo } from "~/server/cron/repos";

export default defineEventHandler(() => {
  const result: BaseRepo[] = JSON.parse(
    readFileSync("repos-data.json", "utf-8")
  );

  result.sort((last, next) => last.name.localeCompare(next.name));

  return result;
});
