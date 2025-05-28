import { NavBar } from '../components/NavBar'
import { SearchBar } from '../components/SearchBar'
import { Box } from '@radix-ui/themes'



function Home() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <SearchBar />

    </Box>
  )
}

export default Home
