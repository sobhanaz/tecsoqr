import {
  Box,
  Card,
  CardBody,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import type {
  QRCodeContent,
  QRCodeCustomization,
  QRCodeURL,
  QRCodeText,
  QRCodeWiFi,
  QRCodeVCard,
  QRCodeEmail,
} from "@/types/qr-code";
import {
  URLForm,
  TextForm,
  WiFiForm,
  VCardForm,
  EmailForm,
} from "@/components/qr-forms";
import { QRCustomization } from "@/components/qr-customize";
import { QRPreview } from "@/components/qr-preview";
import { PageHeader, PageLayout } from "@/components/ui/Layout";

const INITIAL_QR_CONTENT: QRCodeContent = {
  type: "url",
  url: "https://",
};

const INITIAL_CUSTOMIZATION: QRCodeCustomization = {
  foreground: "#000000",
  background: "#FFFFFF",
};

export const QRGeneratorPage = () => {
  const [content, setContent] = useState<QRCodeContent>(INITIAL_QR_CONTENT);
  const [customization, setCustomization] = useState<QRCodeCustomization>(
    INITIAL_CUSTOMIZATION
  );
  const toast = useToast();
  const hasShownContentToast = useRef(false);
  const hasShownStyleToast = useRef(false);

  const handleContentChange = (newContent: QRCodeContent) => {
    setContent(newContent);

    // Only show toast once per session and only if content has meaningful data
    const hasContent =
      (newContent.type === "url" &&
        newContent.url &&
        newContent.url !== "https://") ||
      (newContent.type === "text" && newContent.text?.trim()) ||
      (newContent.type === "email" && newContent.email?.trim()) ||
      (newContent.type === "wifi" && newContent.ssid?.trim()) ||
      (newContent.type === "vcard" &&
        (newContent.firstName?.trim() || newContent.lastName?.trim()));

    if (hasContent && !hasShownContentToast.current) {
      hasShownContentToast.current = true;
      toast({
        title: "✨ QR Code Ready!",
        description: "Your QR code has been generated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
        variant: "subtle",
      });
    }
  };

  const handleCustomizationChange = (newCustomization: QRCodeCustomization) => {
    setCustomization(newCustomization);

    // Only show style toast once per session
    if (!hasShownStyleToast.current) {
      hasShownStyleToast.current = true;
      toast({
        title: "🎨 Style Applied!",
        description: "Your QR code design has been customized.",
        status: "info",
        duration: 2500,
        isClosable: true,
        position: "bottom-right",
        variant: "left-accent",
      });
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="tecso QR Code Generator "
        description="Create custom QR codes for URLs, text, Wi-Fi networks, and more"
      />

      <Box
        w="100%"
        maxW="container.lg"
        mx="auto"
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <HStack
          spacing={{ base: 6, lg: 8 }}
          align="flex-start"
          flexDirection={{ base: "column", lg: "row" }}
          justify="center"
          flex="1"
        >
          {/* Left Column: Content and Customization */}
          <VStack flex="1" w="100%" spacing={4}>
            <Card w="100%">
              <CardBody>
                <Tabs isLazy variant="enclosed">
                  <TabList>
                    <Tab>URL</Tab>
                    <Tab>Text</Tab>
                    <Tab>Wi-Fi</Tab>
                    <Tab>vCard</Tab>
                    <Tab>Email</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <URLForm
                        value={content as QRCodeURL}
                        onChange={handleContentChange}
                      />
                    </TabPanel>
                    <TabPanel>
                      <TextForm
                        value={content as QRCodeText}
                        onChange={handleContentChange}
                      />
                    </TabPanel>
                    <TabPanel>
                      <WiFiForm
                        value={content as QRCodeWiFi}
                        onChange={handleContentChange}
                      />
                    </TabPanel>
                    <TabPanel>
                      <VCardForm
                        value={content as QRCodeVCard}
                        onChange={handleContentChange}
                      />
                    </TabPanel>
                    <TabPanel>
                      <EmailForm
                        value={content as QRCodeEmail}
                        onChange={handleContentChange}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>

            <Card w="100%">
              <CardBody>
                <QRCustomization
                  value={customization}
                  onChange={handleCustomizationChange}
                />
              </CardBody>
            </Card>
          </VStack>

          {/* Right Column: Preview */}
          <Box
            flex={{ base: "1", lg: "0 0 400px" }}
            w="100%"
            position={{ base: "relative", lg: "sticky" }}
            top={{ base: 0, lg: "24px" }}
          >
            <Card w="100%">
              <CardBody>
                <QRPreview content={content} customization={customization} />
              </CardBody>
            </Card>
          </Box>
        </HStack>
      </Box>
    </PageLayout>
  );
};
