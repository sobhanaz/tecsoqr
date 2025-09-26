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
import { NeonModeProvider } from "./theme/NeonModeProvider";
import { useNeonMode } from "./theme/useNeonMode";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { BulkPage } from "./pages/BulkPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ContactPage } from "./pages/ContactPage";

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
        <SubscriptionProvider>
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
                <Route
                  path="/bulk"
                  element={
                    <Layout>
                      <BulkPage />
                    </Layout>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <Layout>
                      <AnalyticsPage />
                    </Layout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Layout>
                      <ContactPage />
                    </Layout>
                  }
                />
              </Routes>
            </Router>
          </ErrorBoundary>
        </SubscriptionProvider>
      </NeonModeProvider>
    </ChakraProvider>
  );
}

export default App;
