import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { QRGeneratorPage } from "./pages/QRGeneratorPage";
import { Navbar } from "./components/Navbar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles/global.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <Navbar />
        <QRGeneratorPage />
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
