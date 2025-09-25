import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaGithub, FaStar, FaCode, FaRocket } from "react-icons/fa";
import { useNeonMode } from "@/theme/NeonModeProvider";

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 5px var(--chakra-colors-neon-pink), 0 0 10px var(--chakra-colors-neon-pink), 0 0 20px var(--chakra-colors-neon-cyan); }
  50% { text-shadow: 0 0 10px var(--chakra-colors-neon-cyan), 0 0 20px var(--chakra-colors-neon-cyan), 0 0 30px var(--chakra-colors-neon-pink); }
`;

export const Hero = () => {
  const { neon } = useNeonMode();
  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      bg={bg}
      py={{ base: 12, md: 20 }}
      position="relative"
      overflow="hidden"
      _before={
        neon
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,54,210,0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(29,229,255,0.08), transparent 50%)",
              pointerEvents: "none",
            }
          : undefined
      }
    >
      <Container maxW="container.lg" position="relative">
        <VStack spacing={8} textAlign="center">
          {/* GitHub-style badge */}
          <HStack
            spacing={2}
            bg={useColorModeValue("gray.100", "gray.800")}
            px={4}
            py={2}
            borderRadius="full"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            fontSize="sm"
            fontWeight="medium"
            animation={neon ? `${float} 3s ease-in-out infinite` : undefined}
            boxShadow={neon ? "0 0 20px rgba(255,54,210,0.3)" : undefined}
          >
            <FaStar color={neon ? "#ff36d2" : undefined} />
            <Text>Open Source QR Generator</Text>
            <FaGithub />
          </HStack>

          {/* Main Heading */}
          <VStack spacing={4}>
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="black"
              lineHeight="shorter"
              bgGradient={
                neon
                  ? "linear(to-r, neon.pink, neon.cyan, neon.purple)"
                  : "linear(to-r, brand.500, brand.600, brand.700)"
              }
              bgClip="text"
              animation={
                neon ? `${glow} 2s ease-in-out infinite alternate` : undefined
              }
            >
              Generate Beautiful
              <br />
              QR Codes Instantly
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="2xl"
              lineHeight="tall"
            >
              Create professional, customizable QR codes for your business with
              our modern, GitHub-inspired interface. Support for URLs, text,
              vCards, WiFi, and more.
            </Text>
          </VStack>

          {/* CTA Buttons */}
          <HStack spacing={4} flexWrap="wrap" justify="center">
            <Button
              size="lg"
              variant={neon ? "neon" : "solid"}
              leftIcon={<FaRocket />}
              _hover={{ transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              leftIcon={<FaCode />}
              as="a"
              href="https://github.com/tecsodev/tecsoqr"
              target="_blank"
              borderColor={neon ? "neon.cyan" : "brand.500"}
              color={neon ? "neon.cyan" : "brand.500"}
              _hover={{
                bg: neon ? "rgba(29,229,255,0.1)" : "brand.50",
                transform: "translateY(-2px)",
                boxShadow: neon ? "0 4px 20px rgba(29,229,255,0.3)" : undefined,
              }}
              transition="all 0.2s"
            >
              View Source
            </Button>
          </HStack>

          {/* GitHub-style stats (mock data) */}
          <HStack
            spacing={8}
            pt={8}
            fontSize="sm"
            color={textColor}
            display={{ base: "none", md: "flex" }}
          >
            <HStack spacing={2}>
              <FaStar color={neon ? "#fff951" : undefined} />
              <Text fontWeight="semibold">1.2k stars</Text>
            </HStack>
            <HStack spacing={2}>
              <FaCode color={neon ? "#3dff8a" : undefined} />
              <Text fontWeight="semibold">MIT License</Text>
            </HStack>
            <HStack spacing={2}>
              <FaRocket color={neon ? "#805dff" : undefined} />
              <Text fontWeight="semibold">Production Ready</Text>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};
