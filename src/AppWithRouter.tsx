import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./theme";
import { QRGeneratorPage } from "./pages/QRGeneratorPage";
import { AboutPage } from "./pages/AboutPage";
import { APIPage } from "./pages/APIPage";
import { PricingPage } from "./pages/PricingPage";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles/global.css";
import { NeonModeProvider, useNeonMode } from "./theme/NeonModeProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { neon } = useNeonMode();

  return (
    <Box w="100%" className={neon ? "neon-grid" : undefined}>
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <Box px={4} py={4}>
        <Box maxW="container.lg" mx="auto">
          <QRGeneratorPage />
        </Box>
      </Box>
    </Layout>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NeonModeProvider>
        <ErrorBoundary>
          <Router basename="/tecsoqr">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/about"
                element={
                  <Layout>
                    <AboutPage />
                  </Layout>
                }
              />
              <Route
                path="/api"
                element={
                  <Layout>
                    <APIPage />
                  </Layout>
                }
              />
              <Route
                path="/pricing"
                element={
                  <Layout>
                    <PricingPage />
                  </Layout>
                }
              />
            </Routes>
          </Router>
        </ErrorBoundary>
      </NeonModeProvider>
    </ChakraProvider>
  );
}

export default App;
