export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface ProofItem {
  avatars: string[];
  label: string;
  sublabel?: string;
}
