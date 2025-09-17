import { Component, type ErrorInfo } from 'react';
import { Box, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box 
          minH="100vh" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          p={4}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <VStack spacing={4} textAlign="center" maxW="lg">
            <Heading size="lg" color={useColorModeValue('brand.600', 'brand.300')}>
              Oops! Something went wrong
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              We encountered an error while trying to process your request. 
              Please try refreshing the page or come back later.
            </Text>
            <Button
              colorScheme="brand"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}