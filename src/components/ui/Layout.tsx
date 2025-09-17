import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <VStack spacing={2} w="100%" mb={8} textAlign="center">
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        fontWeight="bold"
      >
        {title}
      </Heading>
      {description && (
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          color="gray.600"
          _dark={{ color: 'gray.400' }}
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
    <Container
      maxW="container.lg"
      py={{ base: 4, md: 8 }}
      px={{ base: 4, md: 6 }}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      {children}
    </Container>
  );
};