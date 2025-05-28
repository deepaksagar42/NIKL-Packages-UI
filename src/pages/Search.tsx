import { Box, Text } from "@radix-ui/themes";
import React from "react";
import { SearchBar } from "../components/SearchBar";
import { DisplaySinglePackage } from "../components/SinglePackage";
import { NavBar } from "../components/NavBar";


const FakeResults = [
  {
    Name: "example-package",
    LatestVersion: "1.0.0",
    ShortDescription: "This is an example package.",
    UpdatedAt: "2023-10-01T12:00:00Z",
  },
  {
    Name: "another-package",
    LatestVersion: "2.3.4",
    ShortDescription: "Another example package.",
    UpdatedAt: "2023-10-02T15:30:00Z",
  }
];

export const Search: React.FC = () => {
  
  // Get the search query from the URL: "/search?q=test"
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q");

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />
      <SearchBar />

      <Text>
        Search query param is: <strong>{query}</strong>
      </Text>

      {FakeResults.map((pkg) => (
        <DisplaySinglePackage
          key={pkg.Name}
          Name={pkg.Name}
          LatestVersion={pkg.LatestVersion}
          ShortDescription={pkg.ShortDescription}
          UpdatedAt={pkg.UpdatedAt}
        />
      ))}

    </Box>
  );
};

export default Search;
