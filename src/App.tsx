import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./theme";
import { QRGeneratorPage } from "./pages/QRGeneratorPage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles/global.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <QRGeneratorPage />
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
