import { Box, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams } from "react-router-dom";
import { DependenciesList } from "../components/DependenciesList";
import { PackageVersionsList } from "../components/PackageVersionsList";
import { fetchPackageReadme } from "../api/packageApi";
import type { PackageReadme } from "../api/types";
import { MarkdownRenderer } from "../components/MarkdownRenderer";


export const PublicPackageDetails: React.FC = () => {
  // Get the Package ID and Version from the URL path /package/:id/:version
  const { id: packageId, version: packageVersion } = useParams<{
    id: string;
    version: string;
  }>();
  
  const [readme, setReadme] = useState<PackageReadme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReadme = async () => {
      if (packageId && packageVersion) {
        try {
          setIsLoading(true);
          const readmeData = await fetchPackageReadme(packageId, packageVersion);
          setReadme(readmeData);
        } catch (error) {
          console.error('Error fetching readme:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadReadme();
  }, [packageId, packageVersion]);

  // Placeholder metadata object
  const packageMeta = {
    about: "A short description about this package.",
    updated: "about 1 month ago",
    version: packageVersion,
    license: "MIT OR Apache-2.0",
    size: "292 KiB",
    documentation: "https://docs.rs/syn/2.0.101",
    repository: "https://github.com/dtolnay/syn",
    owners: ["David Tolnay (dtolnay)", "David Tolnay"],
    categories: ["Procedural macro helpers", "Parser implementations"],
  };
  
  return (
    <>
      <NavBar />
      <Box style={{ maxWidth: 900, margin: "0 auto" }}>
        <Box style={{ padding: "20px" }}>
          <Text as="div" size="6" weight="bold" style={{ marginBottom: 4 }}>
            {packageId}
          </Text>
          <Text as="p" size="3" color="gray">
            Version: {packageVersion} | Downloads: ... | License: ...
          </Text>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Box style={{ flex: 1, padding: "20px" }}>
            <Tabs.Root defaultValue="readme">
              <Tabs.List>
                <Tabs.Trigger value="readme">Readme</Tabs.Trigger>
                <Tabs.Trigger value="versions">Versions</Tabs.Trigger>
                <Tabs.Trigger value="dependencies">Dependencies</Tabs.Trigger>
              </Tabs.List>
              <Box pt="3">
                <Tabs.Content value="readme">
                  {isLoading ? (
                    <Box p="4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }}>
                      <Text size="2">Loading readme content...</Text>
                    </Box>
                  ) : readme ? (
                    <Box py="2">
                      <MarkdownRenderer content={readme.content} />
                    </Box>
                  ) : (
                    <Box p="4">
                      <Text size="2">No readme available for this package.</Text>
                    </Box>
                  )}
                </Tabs.Content>
                <Tabs.Content value="versions">
                  <Text size="2">List of versions for this package</Text>
                  <PackageVersionsList packageId={packageId} />
                </Tabs.Content>
                <Tabs.Content value="dependencies">
                  <DependenciesList packageId={packageId || ''} version={packageVersion || ''} />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
          <Box
            style={{
              width: 280,
              padding: "20px",
              borderLeft: "1px solid #e5e7eb",
            }}
          >
            <Text as="div" size="4" weight="bold" style={{ marginBottom: 8 }}>
              Metadata
            </Text>
            <Text as="p" size="2" color="gray" style={{ marginBottom: 8 }}>
              {packageMeta.updated}
            </Text>
            <Text as="p" size="2" style={{ marginBottom: 4 }}>
              v{packageMeta.version}
            </Text>
            <Text as="p" size="2" style={{ marginBottom: 4 }}>
              {packageMeta.license}
            </Text>
            <Text as="p" size="2" style={{ marginBottom: 8 }}>
              {packageMeta.size}
            </Text>

            <Text
              as="div"
              size="3"
              weight="bold"
              style={{ marginTop: 16, marginBottom: 4 }}
            >
              Install
            </Text>
            <Text as="p" size="2" style={{ marginBottom: 8 }}>
              Run the following nikl command in your project directory:
            </Text>
            <Box
              style={{
                background: "#f5f5f7",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "12px",
                marginTop: "8px",
                fontFamily: "monospace",
                fontSize: "14px",
                overflowX: "auto",
              }}
            >
              <code>
                nikl install {packageId}@{packageVersion}
              </code>
            </Box>

            <Text
              as="div"
              size="3"
              weight="bold"
              style={{ marginTop: 16, marginBottom: 4 }}
            >
              Documentation
            </Text>
            <Text as="p" size="2" style={{ marginBottom: 4 }}>
              <a href={packageMeta.documentation} target="_blank" rel="noopener noreferrer">
                {packageMeta.documentation.replace(/^https?:\/\//, "")}
              </a>
            </Text>

            <Text
              as="div"
              size="3"
              weight="bold"
              style={{ marginTop: 16, marginBottom: 4 }}
            >
              Repository
            </Text>
            <Text as="p" size="2" style={{ marginBottom: 4 }}>
              <a href={packageMeta.repository} target="_blank">
                {packageMeta.repository.replace(/^https?:\/\//, "")}
              </a>
            </Text>

            <Text
              as="div"
              size="3"
              weight="bold"
              style={{ marginTop: 16, marginBottom: 4 }}
            >
              Owners
            </Text>
            {packageMeta.owners.map((owner, idx) => (
              <Text as="p" size="2" key={idx} style={{ marginBottom: 2 }}>
                {owner}
              </Text>
            ))}

            <Text
              as="div"
              size="3"
              weight="bold"
              style={{ marginTop: 16, marginBottom: 4 }}
            >
              Categories
            </Text>
            {packageMeta.categories.map((cat, idx) => (
              <Text as="p" size="2" key={idx} style={{ marginBottom: 2 }}>
                {cat}
              </Text>
            ))}

            <Box mt="4">
              <a
                href="#"
                style={{
                  display: "block",
                  marginBottom: 4,
                  color: "var(--accent-9, #2563eb)",
                  fontSize: "14px",
                  textDecoration: "none",
                  fontWeight: 400,
                }}
              >
                Try on Playground
              </a>
              <a
                href="#"
                style={{
                  display: "block",
                  color: "var(--accent-9, #2563eb)",
                  fontSize: "14px",
                  textDecoration: "none",
                  fontWeight: 400,
                }}
              >
                Report crate
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PublicPackageDetails;
