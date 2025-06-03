import { Box, Flex, Text, Link, Avatar, DropdownMenu } from '@radix-ui/themes';
import NikLPkgMgrLogo from '/nikl-pkg.svg'
import { csrfToken, userDetails } from '../state/Auth';
import { useAtomValue, useSetAtom } from 'jotai';
import { logoutUser } from '../api/users';


type NavButtonProps = {
  name: string;
  href: string;
};

export function NavBar() {
  const csrfTokenValue = useAtomValue(csrfToken);
  const userDetailsValue = useAtomValue(userDetails);
  const setCsrfToken = useSetAtom(csrfToken);
  
  const isSessionValidCookie = document.cookie.includes('IS_SESSION_VALID');
  const user = isSessionValidCookie ? { csrfToken: csrfTokenValue } : null;
  // const user = true; // For testing purposes, assume user is always logged in

  const DisplayNavButton = ({ name, href }: NavButtonProps) => (
    <Link href={href} underline="none" weight="medium" color="gray">
      {name}
    </Link>
  );

  const handleLogout = async () => {
    try {
      await logoutUser(csrfTokenValue || '');
      setCsrfToken('');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <Box
      as="div"
      width="100%"
      px="4"
      py="3"
      mb="3"
      style={{
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
      }}>
      <Flex justify="between" align="center">
        {/* Logo and Title */}
        <Flex align="center" gap="2" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
          <img src={NikLPkgMgrLogo} alt="Nik-Lang Package Manager Logo" style={{ height: '24px', width: '24px' }} />
          <Text as="span" weight="bold" size="4" color="gray">
            Nik-Lang Package Manager
          </Text>
        </Flex>

        <Flex gap="4" align="center">
          <DisplayNavButton name="Home" href="/" />
          <DisplayNavButton name="Search" href="/search" />
          {user ? (
            <>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Flex align="center" gap="2" style={{ cursor: 'pointer' }}>
                    <Avatar
                      src={userDetailsValue?.profilePicture || ''}
                      alt={userDetailsValue?.username || 'User Avatar'}
                      fallback={userDetailsValue?.username?.charAt(0) || '.'}
                    />
                  </Flex>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content style={{ minWidth: '200px' }}>
                  <DropdownMenu.Label>
                    <Flex align="center" gap="2">
                      <Text as="span" weight="bold" size="3" color="gray">
                        {userDetailsValue?.username || 'User'}
                      </Text>
                    </Flex>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item asChild>
                    <Link href="/manage/dashboard">Dashboard</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link href="/manage/packages">Packages</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link href="/manage/profile">Profile</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link href="/manage/settings">Settings</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onClick={handleLogout} color="red">
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </>
          ) : (
            <>
              <DisplayNavButton name="Login" href="/login" />
              <DisplayNavButton name="Register" href="/register" />
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
