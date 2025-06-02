import { Box, Flex, Link, Text, Separator, Grid } from '@radix-ui/themes';

export function Footer() {
  return (
    <Box
      px="5"
      py="6"
      style={{
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
        left: 0,      
        bottom: 0,    
        width: '100%',     

      }}
    >
      <Grid
        columns={{ initial: '1', sm: '2', md: '4' }}
        gap="5"
        align="start"
        mb="6"
      >
        <FooterSection
          heading="Help"
          links={['Installing packages', 'Uploading packages', 'User guide', 'FAQs']}
        />
        <FooterSection
          heading="About"
          links={['Blog', 'Infrastructure', 'Statistics', 'Sponsors']}
        />
        <FooterSection
          heading="Contribute"
          links={['Bugs', 'GitHub', 'Translate', 'Credits']}
        />
        <FooterSection
          heading="Legal"
          links={['Terms of Service', 'Privacy Policy', 'Code of Conduct']}
        />
      </Grid>

      <Separator size="4" my="4" />

      <Flex
  justify="between"
  direction={{ initial: 'column', sm: 'row' }}
  align="center"
  gap="2"
>
  <Text size="1" color="gray">
    © 2025 Nik-Lang. All rights reserved.
  </Text>
  <Flex align="center" gap="2">
    <Text size="1" color="gray">
      Status: <Link href="#" color="blue">All Systems Operational</Link>
    </Text>
    <Box
      style={{
        width: '8px',
        height: '8px',
        backgroundColor: 'green',
        borderRadius: '50%',
      }}
    />
  </Flex>
</Flex>

    </Box>
  );
}

function FooterSection({
  heading,
  links,
}: {
  heading: string;
  links: string[];
}) {
  return (
    <Box>
      <Text size="3" weight="bold" mb="3" color="gray">
        {heading}
      </Text>
      <Flex direction="column" gap="2">
        {links.map((text) => (
          <Link
            key={text}
            href="#"
            size="2"
            color="gray"
            underline="hover"
            style={{ opacity: 0.85 }}
          >
            {text}
          </Link>
        ))}
      </Flex>
    </Box>
  );
}