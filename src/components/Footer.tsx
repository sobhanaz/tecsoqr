import {
  Box,
  Container,
  HStack,
  Text,
  Link,
  useColorModeValue,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { FaGithub, FaHeart } from "react-icons/fa";
import { useNeonMode } from "@/theme/NeonModeProvider";

export const Footer = () => {
  const { neon } = useNeonMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor} py={8} mt={12}>
      <Container maxW="container.lg">
        <VStack spacing={4}>
          <HStack spacing={6} flexWrap="wrap" justify="center">
            <Link
              href="https://github.com/tecsodev/tecsoqr"
              isExternal
              display="flex"
              alignItems="center"
              gap={2}
              color={neon ? "neon.cyan" : "brand.500"}
              _hover={{
                textDecoration: "none",
                color: neon ? "neon.pink" : "brand.600",
                textShadow: neon ? "0 0 8px currentColor" : undefined,
              }}
              transition="all 0.2s"
            >
              <FaGithub />
              <Text fontWeight="medium">View on GitHub</Text>
            </Link>

            <Text color={textColor}>•</Text>

            <Link
              href="https://cv.tecso.team/"
              isExternal
              color={textColor}
              _hover={{ color: neon ? "neon.green" : "brand.500" }}
              transition="all 0.2s"
            >
              TECSO Team
            </Link>

            <Text color={textColor}>•</Text>

            <Text color={textColor} fontSize="sm">
              MIT License
            </Text>
          </HStack>

          <Divider />

          <HStack spacing={2} color={textColor} fontSize="sm">
            <Text>Made with</Text>
            <FaHeart color={neon ? "#ff36d2" : "#e53e3e"} />
            <Text>by TECSO Team</Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};
