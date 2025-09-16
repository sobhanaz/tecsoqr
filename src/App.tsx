import { Box, ChakraProvider, Container, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { ContentTabs } from './components/ContentTabs'
// Remove unused import
import type { QRCodeData } from './components/QRForm'
import { QRPreview } from './components/QRPreview'
import theme from './theme'

function App() {
  const [qrData, setQRData] = useState<QRCodeData>({
    content: '',
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    size: 256,
    level: 'M',
  });

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Container py={8}>
          <HStack align="flex-start" spacing={8} flexDirection={{ base: 'column', lg: 'row' }}>
            <VStack flex={1} spacing={8} align="stretch" w="100%">
              <ContentTabs onUpdate={setQRData} />
            </VStack>
            <Box flex={1} w="100%">
              <QRPreview {...qrData} />
            </Box>
          </HStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
