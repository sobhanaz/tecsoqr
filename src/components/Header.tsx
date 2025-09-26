import { Box, Heading, Text, Image, useColorMode } from "@chakra-ui/react";

export const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Box textAlign="center" py={8}>
      <Image
        h="60px"
        src={import.meta.env.BASE_URL + "assets/logo.svg"}
        alt="TECSO QR Logo"
        filter={colorMode === "dark" ? "invert(1)" : "none"}
        _dark={{ filter: "invert(1)" }}
        mx="auto"
        mb={4}
      />
      <Heading as="h1" size="2xl" color="blue.600">
        TECSOQR v1.0
      </Heading>
      <Text mt={2} fontSize="lg">
        Create Custom QR Codes for Free
      </Text>
    </Box>
  );
};
