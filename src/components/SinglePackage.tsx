import { Box, Card, Text } from '@radix-ui/themes';


interface SinglePackageProps {
  Name: string;
  LatestVersion: string;
  ShortDescription: string;
  UpdatedAt: string;
}

export function DisplaySinglePackage({ Name, LatestVersion, ShortDescription, UpdatedAt }: SinglePackageProps) {
  return (
    <Box maxWidth="450px">
      <Card asChild>
        <a href={`/package/${Name}/${LatestVersion}`} style={{ textDecoration: 'none' }}>
          <Text as="div" size="2" weight="bold">
            {Name} <span style={{ color: 'gray' }}>v{LatestVersion}</span>
          </Text>
          <Text as="div" color="gray" size="2">
            {ShortDescription}
          </Text>
          <Text as="div" color="gray" size="1">
            Last updated: {new Date(UpdatedAt).toLocaleTimeString()}
          </Text>
        </a>
      </Card>
    </Box>
  )
}
