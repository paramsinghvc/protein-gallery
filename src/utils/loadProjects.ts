import type { Project } from '@/types/project';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function loadProjects(): Promise<Project[]> {
  const file = path.join(process.cwd(), 'public/data/projects.json');
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw) as Project[];
}
