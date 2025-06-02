import { NavBar } from '../components/NavBar'
import { SearchBar } from '../components/SearchBar'
import { Box } from '@radix-ui/themes'



function Home() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <NavBar />

      <SearchBar />
      <h1 style={{ marginTop: 32, fontWeight: 700 }}>Welcome to NIKL Packages</h1>
      <p style={{ maxWidth: 600, textAlign: 'center', marginTop: 16 }}>
        Discover, search, and manage open source packages with ease. NIKL Packages is your one-stop platform for finding, publishing, and maintaining packages for your projects. 
        Use the search bar above to get started, or sign in to manage your own packages and profile.
      </p>



    </Box>
  )
}

export default Home
