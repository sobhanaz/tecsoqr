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
  Tooltip,
  Text,
  useToken,
  FormControl,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub, FaTwitter, FaBolt } from "react-icons/fa";
import { useNeonMode } from "@/theme/NeonModeProvider";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const { neon, toggleNeon } = useNeonMode();
  const [pink, cyan] = useToken("colors", ["neon.pink", "neon.cyan"]);

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      py={2}
      position="sticky"
      top={0}
      zIndex={50}
    >
      <Container maxW="1200px">
        <Flex justify="space-between" align="center">
          <HStack spacing={8}>
            <Box as="a" href="/tecsoqr/" cursor="pointer">
              <Image
                h="40px"
                src={import.meta.env.BASE_URL + "assets/logo.svg"}
                alt="TECSOQR"
                filter={colorMode === "dark" ? "invert(1)" : "none"}
                _dark={{ filter: "invert(1)" }}
                aria-label="TECSOQR Logo"
              />
            </Box>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <Button as="a" href="/tecsoqr/about" variant="ghost">
                ABOUT
              </Button>
              <Button as="a" href="/tecsoqr/api" variant="ghost">
                QR CODE API
              </Button>
              <Button as="a" href="/tecsoqr/pricing" variant="ghost">
                PRICING
              </Button>
            </HStack>
          </HStack>

          <HStack spacing={4}>
            {/* Language Selector */}
            <FormControl display={{ base: "none", md: "block" }} w="120px">
              <Box as="label" display="block" htmlFor="lang-select">
                <Text
                  display="block"
                  fontSize="0.55rem"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                  color={useColorModeValue("gray.500", "gray.400")}
                  mb="2px"
                >
                  Language
                </Text>
                <Select
                  id="lang-select"
                  size="sm"
                  variant="filled"
                  bg={useColorModeValue("gray.100", "gray.700")}
                  defaultValue="en"
                  aria-label="Language"
                >
                  <option value="en">ENGLISH</option>
                  <option value="es">ESPAÑOL</option>
                  <option value="fr">FRANÇAIS</option>
                  <option value="de">DEUTSCH</option>
                  <option value="it">ITALIANO</option>
                </Select>
              </Box>
            </FormControl>

            {/* Neon Toggle */}
            <Tooltip label={neon ? "Disable Neon Mode" : "Enable Neon Mode"}>
              <IconButton
                aria-label="Toggle neon mode"
                icon={<FaBolt />}
                variant={neon ? "solid" : "ghost"}
                colorScheme={neon ? "pink" : undefined}
                size="sm"
                onClick={toggleNeon}
                _before={
                  neon
                    ? {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        boxShadow: `0 0 8px ${pink}, 0 0 16px ${cyan}`,
                        borderRadius: "md",
                      }
                    : undefined
                }
              />
            </Tooltip>

            {/* Social Links + GitHub Star */}
            <HStack spacing={2} display={{ base: "none", md: "flex" }}>
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                variant="ghost"
                size="sm"
                as="a"
                href="https://github.com/sobhanaz/tecsoqr"
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
              <Button
                as="a"
                href="https://github.com/sobhanaz/tecsoqr"
                target="_blank"
                size="sm"
                variant="neon"
                display={{ base: "none", lg: "inline-flex" }}
              >
                <HStack spacing={1}>
                  <FaGithub />
                  <Text fontSize="xs">Star</Text>
                </HStack>
              </Button>
            </HStack>

            {/* Theme Toggle */}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
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
                display={{ base: "flex", md: "none" }}
                size="sm"
              />
              <MenuList>
                <MenuItem as="a" href="/tecsoqr/about">
                  ABOUT
                </MenuItem>
                <MenuItem as="a" href="/tecsoqr/api">
                  QR CODE API
                </MenuItem>
                <MenuItem as="a" href="/tecsoqr/pricing">
                  PRICING
                </MenuItem>
                <MenuItem>ENGLISH</MenuItem>
                <MenuItem
                  as="a"
                  href="https://github.com/sobhanaz/tecsoqr"
                  target="_blank"
                >
                  GITHUB
                </MenuItem>
                <MenuItem
                  as="a"
                  href="https://twitter.com/tecsodev"
                  target="_blank"
                >
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
