import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/nikl-pkg.svg'
import '../App.css'
import { SearchBar } from '../components/SearchBar'
import { Box } from '@radix-ui/themes'



const dummyPackages = [
  'nikl-core',
  'nikl-utils',
  'nikl-http',
  'nikl-db',
  'nikl-ui',
  'nikl-auth',
]

function Home() {
  const [searchResults, setSearchResults] = useState<string[]>([])


  return (
    <Box>
      <SearchBar />

    </Box>
  )
}

export default Home
