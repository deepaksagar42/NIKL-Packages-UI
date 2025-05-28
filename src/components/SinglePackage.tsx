import { Box, Card, Text, Flex } from "@radix-ui/themes";

interface SinglePackageProps {
  Name: string;
  LatestVersion: string;
  ShortDescription: string;
  UpdatedAt: string;
}

export function DisplaySinglePackage({
  Name,
  LatestVersion,
  ShortDescription,
  UpdatedAt,
}: SinglePackageProps) {
  return (
    <Box width="100%" mb="3">
      <Card asChild variant="classic">
        <a
          href={`/package/${Name}/${LatestVersion}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            padding: "16px",
            display: "block",
            width: "100%",
          }}
        >
          <Flex direction="column" gap="2">
            <Text as="div" size="3" weight="bold">
              {Name}{" "}
              <Text as="span" color="gray" size="2" weight="regular">
                v{LatestVersion}
              </Text>
            </Text>

            <Text as="div" color="gray" size="2">
              {ShortDescription}
            </Text>

            <Text as="div" color="gray" size="1">
              Last updated:{" "}
              {new Date(UpdatedAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Text>
          </Flex>
        </a>
      </Card>
    </Box>
  );
}
