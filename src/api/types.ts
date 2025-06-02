export interface Dependency {
  name: string;
  version: string;
  description: string;
  features?: string[];
  isOptional?: boolean;
}

export interface PackageDetails {
  id: string;
  version: string;
  dependencies: Dependency[];
}

export interface PackageReadme {
  content: string;
  format: 'markdown';
}
