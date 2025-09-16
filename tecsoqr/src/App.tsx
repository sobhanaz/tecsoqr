import { ChakraProvider, Container, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Header } from './components/Header'
import { QRForm } from './components/QRForm'
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
      <Container py={8}>
        <VStack gap={8}>
          <Header />
          <QRForm onUpdate={setQRData} />
          <QRPreview {...qrData} />
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App
