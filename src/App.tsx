import { Box, ChakraProvider, Container, HStack, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { ContentTabs } from './components/ContentTabs'
import type { QRCodeData } from './components/QRForm'
import { QRPreview } from './components/QRPreview'
import { ErrorBoundary } from './components/ErrorBoundary'
import theme from './theme'

function App() {
  const [qrData, setQRData] = useState<QRCodeData>({
    content: '',
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    size: 256,
    level: 'M',
  });
  const toast = useToast();

  const handleQRUpdate = (data: QRCodeData) => {
    setQRData(data);
    if (data.content) {
      toast({
        title: 'QR Code Updated',
        description: 'Your QR code has been generated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <Box minH="100vh" bg="gray.50" role="main">
          <Navbar />
          <Container py={8} role="region" aria-label="QR Code Generator">
            <HStack 
              align="flex-start" 
              spacing={8} 
              flexDirection={{ base: 'column', lg: 'row' }}
              role="group"
              aria-label="QR Code Generator Interface"
            >
              <VStack flex={1} spacing={8} align="stretch" w="100%">
                <ContentTabs onUpdate={handleQRUpdate} />
              </VStack>
              <Box flex={1} w="100%" role="complementary" aria-label="QR Code Preview">
                <QRPreview {...qrData} />
              </Box>
            </HStack>
          </Container>
        </Box>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default App
