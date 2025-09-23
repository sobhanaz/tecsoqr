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
import { useState } from "react";
import type { QRCodeContent, QRCodeCustomization } from "@/types/qr-code";
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

  const handleContentChange =
    (_: QRCodeContent["type"]) => (newContent: QRCodeContent) => {
      setContent(newContent);
      toast({
        title: "QR Code Updated",
        description: "Your QR code content has been updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    };

  const handleCustomizationChange = (newCustomization: QRCodeCustomization) => {
    setCustomization(newCustomization);
    toast({
      title: "Style Updated",
      description: "QR code appearance has been updated.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <PageLayout>
      <PageHeader
        title="tecso QR Code Generator"
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
                        value={content as any}
                        onChange={handleContentChange("url")}
                      />
                    </TabPanel>
                    <TabPanel>
                      <TextForm
                        value={content as any}
                        onChange={handleContentChange("text")}
                      />
                    </TabPanel>
                    <TabPanel>
                      <WiFiForm
                        value={content as any}
                        onChange={handleContentChange("wifi")}
                      />
                    </TabPanel>
                    <TabPanel>
                      <VCardForm
                        value={content as any}
                        onChange={handleContentChange("vcard")}
                      />
                    </TabPanel>
                    <TabPanel>
                      <EmailForm
                        value={content as any}
                        onChange={handleContentChange("email")}
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
