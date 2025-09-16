import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bg} borderBottom="1px" borderColor={borderColor} py={2}>
      <Container maxW="1200px">
        <Flex justify="space-between" align="center">
          <HStack spacing={8}>
            <Box>
              <Image h="40px" src="/logo.png" alt="TECSOQR" />
            </Box>
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Button variant="ghost">ABOUT</Button>
              <Button variant="ghost">QR CODE API</Button>
              <Button variant="ghost">PRICING</Button>
            </HStack>
          </HStack>
          
          <HStack spacing={4}>
            {/* Language Selector */}
            <Select
              size="sm"
              variant="filled"
              bg={useColorModeValue('gray.100', 'gray.700')}
              w="120px"
              defaultValue="en"
              display={{ base: 'none', md: 'block' }}
            >
              <option value="en">ENGLISH</option>
              <option value="es">ESPAÑOL</option>
              <option value="fr">FRANÇAIS</option>
              <option value="de">DEUTSCH</option>
              <option value="it">ITALIANO</option>
            </Select>

            {/* Social Links */}
            <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                variant="ghost"
                size="sm"
                as="a"
                href="https://github.com/tecsodev/tecsoqr"
                target="_blank"
              />
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                size="sm"
                as="a"
                href="https://twitter.com/tecsodev"
                target="_blank"
              />
            </HStack>

            {/* Theme Toggle */}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />

            {/* Mobile Menu */}
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="ghost"
                display={{ base: 'flex', md: 'none' }}
                size="sm"
              />
              <MenuList>
                <MenuItem>ABOUT</MenuItem>
                <MenuItem>QR CODE API</MenuItem>
                <MenuItem>PRICING</MenuItem>
                <MenuItem>ENGLISH</MenuItem>
                <MenuItem as="a" href="https://github.com/tecsodev/tecsoqr" target="_blank">
                  GITHUB
                </MenuItem>
                <MenuItem as="a" href="https://twitter.com/tecsodev" target="_blank">
                  TWITTER
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};