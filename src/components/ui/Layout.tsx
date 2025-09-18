import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <VStack spacing={2} w="100%" mb={8} textAlign="center">
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="bold"
      >
        {title}
      </Heading>
      {description && (
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.600"
          _dark={{ color: "gray.400" }}
        >
          {description}
        </Text>
      )}
    </VStack>
  );
};

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Box
      minH="100vh"
      w="100%"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={{ base: 6, md: 12 }}
    >
      <Container maxW="container.lg" px={{ base: 4, md: 6 }} centerContent>
        {children}
      </Container>
    </Box>
  );
};
