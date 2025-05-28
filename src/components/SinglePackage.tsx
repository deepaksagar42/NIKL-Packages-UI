import { Box, Card, Text } from '@radix-ui/themes';



interface SinglePackageProps {
  packageName: string;
  packageVersion: string;
  packageShortDescription: string;
}




export function SinglePackage({packageName, packageVersion, packageShortDescription}: SinglePackageProps) {

  return (
    <Box maxWidth="350px">
      <Card asChild>
        <a href={`/package/${packageName}/${packageVersion}`} style={{ textDecoration: 'none' }}>
          <Text as="div" size="2" weight="bold">
            {packageName} v{packageVersion}
          </Text>
          <Text as="div" color="gray" size="2">
            {packageShortDescription}
          </Text>
        </a>
      </Card>
    </Box>
  )
}
