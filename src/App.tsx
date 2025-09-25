import { ChakraProvider, Box, Card, CardBody, VStack } from "@chakra-ui/react";
import theme from "./theme";
import { QRGeneratorPage } from "./pages/QRGeneratorPage";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles/global.css";
import { NeonModeProvider, useNeonMode } from "./theme/NeonModeProvider";

const NeonWrapper = () => {
  const { neon } = useNeonMode();
  return (
    <Box w="100%" className={neon ? "neon-grid" : undefined}>
      <Navbar />
      <Hero />
      <VStack spacing={6} px={4} py={4} align="stretch">
        <Card variant={neon ? "neon" : undefined} maxW="container.lg" mx="auto">
          <CardBody>
            <QRGeneratorPage />
          </CardBody>
        </Card>
      </VStack>
      <Footer />
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NeonModeProvider>
        <ErrorBoundary>
          <NeonWrapper />
        </ErrorBoundary>
      </NeonModeProvider>
    </ChakraProvider>
  );
}

export default App;
