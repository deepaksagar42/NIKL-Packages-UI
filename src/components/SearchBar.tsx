import {useState} from 'react';
import { TextField, Button } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';


export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  // On click of the search button, we do "/search?q={searchTerm}" and redirect to the search page
  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
      window.location.href = searchUrl;
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSearch();
    }}
    >
      <TextField.Root
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Packages"
        variant='surface'
        radius='large'
        size="3"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        inputMode="search"
      >
        <TextField.Slot side="left" px="1">
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        
        <TextField.Slot side="right" px="1">
          <Button onClick={handleSearch} size="2">Search</Button>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}
