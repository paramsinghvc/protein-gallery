export type ProjectCategory = 'Enzyme' | 'Peptide' | 'Biosensor';

export type ProjectTarget = {
  name: string;
  pdb: string | null;
};

export type ProjectProtein = {
  name: string;
  pdb: string | null;
};

export type ProjectMetrics = Partial<{
  'Binding affinity': string;
  'Success rate': string;
  RMSD: string;
}> &
  Record<string, string>;

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  partner: string;
  imageUrl: string;
  /** "YYYY" or "YYYY-MM-DD" */
  publishedDate: string;
  featured?: boolean;
  tags: string[];
  target: ProjectTarget;
  proteins: ProjectProtein[];
  metrics: ProjectMetrics;
  /** Markdown string used on the detail page */
  description: string;
  links?: ProjectLink[];
};
