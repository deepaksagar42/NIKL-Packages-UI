
import { Box, Grid, Flex, Text, Link, Separator } from '@radix-ui/themes'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

const statusColor = {
  operational: 'var(--green-9)',
  ExperincingHighLoad: 'var(--yellow-9)',
  down: 'var(--red-9)',
}

const Footer = () => {
  const systemStatus = 'up' // mock status

  return (
    <Box
      style={{
        background: 'var(--gray-1)', // milder background color
        color: 'var(--gray-12)',
        padding: '48px 24px 24px',
        margin: '10px 0', 
        width:"100%"
      }}
    >
      <Grid
        columns={{ initial: '1', sm: '2', md: '4' }}
        gap="6"
        justify="center"
        style={{ textAlign: 'center' }}
      >
        <FooterColumn
          title="Help"
          links={[
            'Installing packages',
            'Uploading packages',
            'User guide',
            'Project retention',
            'FAQs',
          ]}
        />
        <FooterColumn
          title="About"
          links={[
            'Blog',
            'Infrastructure dashboard',
            'Statistics',
            'Logos & trademarks',
            'Our sponsors',
          ]}
        />
        <FooterColumn
          title="Contributing"
          links={[
            'Bugs & feedback',
            'GitHub Repo',
            'Translate',
            'Sponsor',
            'Credits',
          ]}
        />
        <FooterColumn
          title="Using"
          links={[
            'Terms of Service',
            'Report issue',
            'Code of conduct',
            'Privacy',
            'Acceptable Use',
          ]}
        />
      </Grid>

      <Separator my="5" size="4" />


        <Flex
        justify="between"
        align="center"
        style={{ flexWrap: 'wrap', gap: '12px', width: '100%', margin: '10px 0' }} 
        >
        {/* Bottom Left */}
        <Text size="2" style={{ textAlign: 'left' }}>
            Developed by the Neko Nik's community.{' '}
            <Link href="https://github.com/sponsors/Neko-Nik" underline="always">
            Donate
            </Link>
        </Text>

        {/* Bottom Right */}
        <Flex align="center" gap="2">
            <Box
            style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: statusColor[systemStatus],
            }}
            />
            <Text size="2">
            Status:{' '}
            <Link href="#" underline="always" color="blue">
                {systemStatus}
            </Link>
            </Text>
        </Flex>
        </Flex>

        <Flex justify="center" style={{ marginTop: '12px', margin: '10px 0' }}> 
        <Text size="1" color="gray" style={{ textAlign: 'center' }}>
            &copy; 2025 Neko Nik. All rights reserved.
        </Text>
        </Flex>
      </Box>
  )
}

const FooterColumn = ({
  title,
  links,
}: {
  title: string
  links: string[]
}) => (
  <Flex direction="column" gap="2" align="center">
    <Text size="4" weight="bold" color="mint">
      {title}
    </Text>
    {links.map((link, i) => (
      <Link
        key={i}
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'var(--gray-11)' }}
      >
        <Flex align="center" gap="1">
          {link}
          <ExternalLinkIcon />
        </Flex>
      </Link>
    ))}
  </Flex>
)

export default Footer
