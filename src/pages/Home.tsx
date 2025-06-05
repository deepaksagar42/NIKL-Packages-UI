import { NavBar } from '../components/NavBar'
import { SearchBar } from '../components/SearchBar'
import { Box, Flex, Text, Button, Card, Grid, Link } from '@radix-ui/themes'
import { ArrowRightIcon, DownloadIcon, ArchiveIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

function Home() {
  const navigate = useNavigate();
  const [popularPackages] = useState([
    { name: 'example-package', version: '1.0.0', description: 'A sample package for demonstration', downloads: 1234 },
    { name: 'nikl-core', version: '0.2.3', description: 'Core utilities for NIKL language', downloads: 987 },
    { name: 'nikl-web', version: '0.1.5', description: 'Web development tools for NIKL', downloads: 756 },
  ])

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <NavBar />
      
      {/* Hero Section */}
      <Box 
        style={{ 
          width: '100%', 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
          padding: '60px 20px',
          marginBottom: '40px'
        }}
      >
        <Flex 
          direction="column" 
          align="center" 
          justify="center"
          gap="4"
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <Text size="9" weight="bold" color="mint" style={{ marginBottom: '16px' }}>
            Nik-Lang Package Manager
          </Text>
          <Text size="5" color="gray" style={{ marginBottom: '24px', maxWidth: '600px' }}>
          A lightweight, intuitive package manager tailored for NIKL, designed to simplify module management and accelerate development workflows.
          </Text>
          
          {/* Search Bar with enhanced styling */}
          <Box style={{ width: '100%', maxWidth: '600px', marginBottom: '24px' }}>
            <SearchBar />
          </Box>
          
          <Flex gap="4">
            <Button size="3" variant="solid" onClick={() => navigate('/search')}>
              Get Started
              <ArrowRightIcon width="16" height="16" />
            </Button>
            <Button
  size="3"
  variant="outline"
  asChild
>
  <a
    href="https://nikl.nekonik.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Documentation
  </a>
</Button>
          </Flex>
        </Flex>
      </Box>
      
      {/* Features Section */}
      <Box style={{ width: '100%', maxWidth: '1200px', padding: '0 20px', marginBottom: '60px' }}>
        <Text size="6" weight="bold" style={{ marginBottom: '50px', textAlign: 'center' }}>
          Why use NIKL Package Manager?
        </Text>
        
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="5" width="100%" style={{ marginTop: '34px'}}>
          <Card size="3">
            <Flex direction="column" gap="2">
            <ArchiveIcon width="24" height="24" color="var(--mint-9)" />
            <Text size="5" weight="bold">Simple & Expressive</Text>
              <Text size="2" color="gray">Clean syntax that is easy to learn and use with a focus on readability.</Text>
            </Flex>
          </Card>
          
          <Card size="3">
            <Flex direction="column" gap="2">
              <DownloadIcon width="24" height="24" color="var(--mint-9)" />
              <Text size="5" weight="bold">Module System</Text>
              <Text size="2" color="gray">Organize your code into reusable modules and share them with others.</Text>
            </Flex>
          </Card>
          
          <Card size="3">
            <Flex direction="column" gap="2">
              <InfoCircledIcon width="24" height="24" color="var(--mint-9)" />
              <Text size="5" weight="bold">Package Management</Text>
              <Text size="2" color="gray">Easily manage dependencies with NIKL packages and integrate them into your projects.</Text>
            </Flex>
          </Card>
        </Grid>
      </Box>
      
      {/* Popular Packages Section */}
      <Box style={{ width: '100%', maxWidth: '1200px', padding: '0 20px', marginBottom: '60px' }}>
        <Flex justify="between" align="center" style={{ marginBottom: '24px' }}>
          <Text size="6" weight="bold">Popular Packages</Text>
          <Link href="/search" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Text size="2">View all packages</Text>
            <ArrowRightIcon width="14" height="14" />
          </Link>
        </Flex>
        
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4" width="100%">
          {popularPackages.map((pkg, index) => (
            <Card key={index} size="2" style={{ height: '100%' }}>
              <Flex direction="column" gap="2" style={{ height: '100%' }}>
                <Link href={`/package/${pkg.name}/${pkg.version}`} style={{ textDecoration: 'none' }}>
                  <Text size="5" weight="bold" color="mint">{pkg.name}</Text>
                </Link>
                <Text size="2" color="gray">v{pkg.version}</Text>
                <Text size="2" style={{ flex: 1 }}>{pkg.description}</Text>
                <Text size="2" color="gray">{pkg.downloads.toLocaleString()} downloads</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Box>
      
      {/* Getting Started Section */}
      <Box 
        style={{ 
          width: '100%', 
          background: 'var(--gray-2)',
          padding: '60px 20px'
        }}
      >
        <Flex 
          direction="column" 
          align="center" 
          gap="4"
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <Text size="6" weight="bold" style={{ marginBottom: '16px' }}>
            Ready to dive in?
          </Text>
          <Text size="3" color="gray" style={{ marginBottom: '24px', maxWidth: '600px' }}>
            Explore the documentation, try the examples, and join our community.
          </Text>
          <a
  href="https://nikl.nekonik.com/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: 'none' }}
>
  <Button size="3" variant="solid">
    Start Exploring
    <ArrowRightIcon width="16" height="16" />
  </Button>
</a>
        </Flex>
      </Box>
      <Footer />

    </Box>
    
  )
}

export default Home
