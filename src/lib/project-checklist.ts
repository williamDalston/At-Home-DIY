import fs from "fs";
import path from "path";

export interface Checklist {
  id: string;
  title: string;
  items: string[];
}

export interface ChecklistData {
  checklists: Checklist[];
}

export function getChecklistData(): ChecklistData {
  const filePath = path.join(
    process.cwd(),
    "content",
    "data",
    "project-checklists.json"
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as ChecklistData;
}

export function getChecklistById(id: string): Checklist | undefined {
  const data = getChecklistData();
  return data.checklists.find((c) => c.id === id);
}
