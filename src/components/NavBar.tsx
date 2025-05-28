import { Box, Flex, Text, Link } from '@radix-ui/themes';

export function NavBar() {
  return (
    <Box
      as="div"
      width="100%"
      px="4"
      py="3"
      style={{
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
      }}>
      <Flex justify="between" align="center">
        {/* Logo / Brand */}
        <Text as="span" weight="bold" size="4" color="gray">
          Nik-Lang Package Manager
        </Text>

        {/* Nav Links */}
        <Flex gap="4" align="center">
          <Link href="/" underline="none" weight="medium" color="gray">
            Home
          </Link>
          <Link href="/search" underline="none" weight="medium" color="gray">
            Search
          </Link>
          <Link href="/login" underline="none" weight="medium" color="gray">
            Login
          </Link>
          <Link href="/register" underline="none" weight="medium" color="gray">
            Register
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
