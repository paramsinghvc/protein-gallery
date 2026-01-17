import { loadProjects } from '@/utils/loadProjects';
import ExploreClient from '@/app/explore/ExploreClient';

export default async function ShowcasePage() {
  const all = await loadProjects();

  const items = all.filter(({ featured }) => !!featured);

  return (
    <ExploreClient
      projects={items}
      title="Showcase"
      description="Featured protein design projects and use-cases."
    />
  );
}
