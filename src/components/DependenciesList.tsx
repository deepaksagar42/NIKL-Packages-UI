import React, { useEffect, useState } from 'react';
import { Box, Table, Text, Badge } from '@radix-ui/themes';
import type { Dependency } from '../api/types';
import { fetchPackageDependencies } from '../api/packageApi';

interface DependenciesListProps {
  packageId: string;
  version: string;
}

export const DependenciesList: React.FC<DependenciesListProps> = ({ packageId, version }) => {
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        setLoading(true);
        const deps = await fetchPackageDependencies(packageId, version);
        setDependencies(deps);
        setError(null);
      } catch (err) {
        setError('Failed to load dependencies');
        console.error('Failed to load dependencies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDependencies();
  }, [packageId, version]);

  if (loading) {
    return (
      <Box p="4">
        <Text size="2">Loading dependencies...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="4">
        <Text size="2" color="red">
          {error}
        </Text>
      </Box>
    );
  }

  if (dependencies.length === 0) {
    return (
      <Box p="4">
        <Text size="2">No dependencies found</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Version</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Features</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dependencies.map((dep) => (
            <Table.Row key={dep.name}>
              <Table.Cell>
                <Text size="2" weight="medium">
                  {dep.name}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="2">{dep.version}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="2">{dep.description}</Text>
              </Table.Cell>
              <Table.Cell>
                <Box style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {dep.features?.map((feature) => (
                    <Badge key={feature} size="1" variant="soft">
                      {feature}
                    </Badge>
                  ))}
                  {dep.isOptional && (
                    <Badge size="1" variant="soft" color="orange">
                      Optional
                    </Badge>
                  )}
                </Box>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};


