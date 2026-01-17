import { loadProjects } from '@/utils/loadProjects';
import ExploreClient from './ExploreClient';

export default async function ExplorePage() {
  const projects = await loadProjects();
  return <ExploreClient projects={projects} />;
}
