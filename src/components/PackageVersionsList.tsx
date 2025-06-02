import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Button, Badge } from '@radix-ui/themes';

interface PackageVersion {
  version: string;
  semverMajor: string;
  author: string;
  updated: string;
  size: string;
  license: string;
  features: number;
  isLatest?: boolean;
}

interface PackageVersionsListProps {
  packageId: string;
  pageSize?: number;
}

// Mock API
const fetchPackageVersions = async (
  packageId: string, 
  page: number,
  pageSize: number
): Promise<{ versions: PackageVersion[]; total: number }> => {
  const total = 334;
  const versions: PackageVersion[] = Array.from({ length: Math.min(pageSize, total - (page - 1) * pageSize) }, (_, i) => {
    const idx = (page - 1) * pageSize + i;
    return {
      version: `2.0.${101 - idx}`,
      semverMajor: '2.x',
      author: 'David Tolnay',
      updated: idx === 0 ? 'about 1 month ago' : `${idx} months ago`,
      size: '291 KiB',
      license: 'MIT OR Apache-2.0',
      features: 11,
      isLatest: idx === 0,
    };
  });
  return new Promise((resolve) => setTimeout(() => resolve({ versions, total }), 300));
};

export const PackageVersionsList: React.FC<PackageVersionsListProps> = ({ packageId, pageSize = 10 }) => {
  const [page, setPage] = useState(1);
  const [versions, setVersions] = useState<PackageVersion[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPackageVersions(packageId, page, pageSize).then(({ versions, total }) => {
      setVersions(versions);
      setTotal(total);
      setLoading(false);
    });
  }, [packageId, page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);
  return (
    <Box>
      <Flex justify="space-between" align="center" mb="3">
        <Text size="2" style={{ display: 'block' }}>
          {loading ? 'Loading versions...' : `${total} versions since September 7th, 2016`}
        </Text>
      </Flex>
      
    <Box style={{ listStyle: 'none', padding: 0 }}>
        {versions.map((v) => (
          <Box
            key={v.version}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 4,
              padding: '16px',
              marginBottom: 8,
            }}
          >
            <Flex align="center">
              <Box style={{ width: 50, textAlign: 'center' }}>
                <Badge size="2" color="gray" variant="soft" style={{ 
                  borderRadius: '50%', 
                  padding: '6px', 
                  width: '36px', 
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f4f4f5'
                }}>
                  {v.semverMajor}
                </Badge>
              </Box>
              
              <Text size="4" weight="bold" style={{ width: 80 }}>
                {v.version}
              </Text>
              
              <Box style={{ flex: 1 }}>
                <Flex align="center" gap="2" mb="1">
                  <Text size="2" color="gray" style={{ textTransform: 'uppercase' }}>BY</Text>
                  <Flex align="center" gap="1">
                    {/* Avatar placeholder - can be replaced with actual avatar component */}
                    <Box style={{ 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '50%', 
                      background: '#f87171',
                      display: 'inline-block',
                      marginRight: '4px'
                    }} />
                    <Text size="2" weight="bold">{v.author}</Text>
                  </Flex>
                  <Text size="2" color="gray">{v.updated}</Text>
                </Flex>
                
                <Flex gap="3" align="center" style={{ fontSize: '12px', color: 'gray' }}>
                  <Text style={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ width: '14px', marginRight: '4px', display: 'inline-block', opacity: 0.6 }}>
                      v{v.semverMajor.split('.')[0]}
                    </Box>
                    {v.size}
                  </Text>
                  <Text>{v.license}</Text>
                  <Text>{v.features} FEATURES</Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
      
      <Flex mt="4" gap="2" align="center" justify="center">
        <Button variant="soft" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <Text size="2">Page {page} of {totalPages}</Text>
        <Button variant="soft" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};
