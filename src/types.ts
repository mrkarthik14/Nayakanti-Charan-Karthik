export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  status: 'COMPLETED' | 'ONGOING' | 'PRODUCTION';
  description: string;
  evidence: string;
  tools: string[];
  methodology?: string[];
  keyResults: { label: string; value: string; highlight?: boolean }[];
  githubUrl?: string;
  liveUrl?: string;
  isTypographicOnly?: boolean;
  statNumber?: string;
  statLabel?: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface Capability {
  id: string;
  index: string;
  title: string;
  durationChip: string;
  description: string;
  deliverables: string[];
  iconType: 'analytics' | 'ml' | 'ai' | 'engineering';
}

export interface ProcessStep {
  index: string;
  title: string;
  stageName: string;
  summary: string;
  actions: string[];
  metricFocus: string;
}
