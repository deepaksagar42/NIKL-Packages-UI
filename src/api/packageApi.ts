import type { Dependency, PackageReadme } from './types';

export const fetchPackageDependencies = async (_packageId: string, _version: string): Promise<Dependency[]> => {
  // TODO: Replace with actual API call using packageId and version
  return [
    {
      name: "proc-macro2",
      version: "1.0.91",
      description: "A substitute implementation of the compiler's `proc_macro` API to decouple token-based libraries from the procedural macro use case.",
      features: ["NO DEFAULT FEATURES"]
    },
    {
      name: "unicode-ident",
      version: "1.0",
      description: "Determine whether characters have the XID_Start or XID_Continue properties according to Unicode Standard Annex #31"
    },
    {
      name: "quote",
      version: "1.0.35",
      description: "Quasi-quoting macro quote!(...)",
      isOptional: true,
      features: ["OPTIONAL", "NO DEFAULT FEATURES"]
    }
  ];
};

export const fetchPackageReadme = async (packageId: string, version: string): Promise<PackageReadme> => {
  // TODO: Replace with actual API call that fetches README from backend
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      content: `# ${packageId} v${version}

This is a sample readme for demonstration purposes.

## Features

- **Feature 1**: Markdown rendering with code highlighting
- **Feature 2**: Support for tables, lists, and other formatting
- **Feature 3**: Compatible with GitHub Flavored Markdown

## Installation

\`\`\`bash
nikl install ${packageId}@${version}
\`\`\`

## Usage Example

\`\`\`javascript
import { example } from '${packageId}';

// Initialize the package
const instance = example.create({
  debug: true,
  version: '${version}'
});

// Use the package features
instance.doSomethingAwesome();
\`\`\`

## API Reference

| Method | Description | Returns |
|--------|-------------|---------|
| create(options) | Creates a new instance | Object |
| doSomethingAwesome() | Does something awesome | void |
| getResults() | Retrieves results | Array |

> **Note**: This is a demo readme to showcase markdown rendering capabilities.

You can learn more about using this package at our [documentation](https://example.com/docs).
`,
      format: 'markdown',
    };
  } catch (error) {
    console.error('Error fetching readme:', error);
    throw new Error('Failed to fetch readme');
  }
};
