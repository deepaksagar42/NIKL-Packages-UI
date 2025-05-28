import { Box } from "@radix-ui/themes";
import React from "react";
import { SinglePackage } from "../components/SinglePackage";


export const Search: React.FC = () => {


  const filteredData = [
    "core",
    "utils",
    "http",
    "db",
    "ui",
    "auth",
  ].filter(item =>
    item.toLowerCase().includes("nikl") // Example filter condition, replace with actual search term
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Search</h1>


      {/* Displaying the filtered results */}
      <Box mt="2" mb="2">
        {filteredData.map((item, index) => (
          <SinglePackage
            packageName={item}
            packageVersion="1.0.0"
            packageShortDescription="This is a short description of the package."
            key={index}
          />
        ))}
      </Box>
      
    </div>
  );
};

export default Search;
