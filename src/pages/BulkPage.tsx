import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
  Badge,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNeonMode } from "@/theme/useNeonMode";
import { useSubscription } from "@/hooks/useSubscription";
import { useState } from "react";
import { QRCodeService } from "@/services/qr-code.service";

export const BulkPage = () => {
  const { neon } = useNeonMode();
  const { hasFeature, plan } = useSubscription();
  const textColor = useColorModeValue("gray.600", "gray.300");
  const [rows, setRows] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const allowed = hasFeature("bulkGeneration");

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          <Heading layerStyle={neon ? "neonText" : undefined}>
            Bulk Generation
          </Heading>
          {!allowed && (
            <Card variant={neon ? "neon" : undefined}>
              <CardBody>
                <VStack align="start" spacing={3}>
                  <Badge colorScheme="pink">Pro feature</Badge>
                  <Text color={textColor}>
                    Bulk generation is available on Pro and Enterprise plans.
                    Upgrade to generate multiple QR codes at once and download a
                    ZIP.
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          )}

          {allowed && (
            <Card variant={neon ? "neon" : undefined}>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Text color={textColor}>
                    Enter up to 100 lines. Each line will become a QR code (URL
                    or text). We'll package them as a ZIP for download.
                  </Text>
                  <Textarea
                    rows={10}
                    placeholder="One item per line..."
                    value={rows}
                    onChange={(e) => setRows(e.target.value)}
                  />
                  <HStack>
                    <Button
                      variant={neon ? "neon" : "solid"}
                      onClick={async () => {
                        const lines = rows
                          .split(/\r?\n/)
                          .map((l) => l.trim())
                          .filter((l) => l.length > 0)
                          .slice(0, 100);

                        if (lines.length === 0) {
                          toast({
                            title: "No input",
                            description: "Add at least one line.",
                            status: "warning",
                          });
                          return;
                        }

                        setLoading(true);
                        try {
                          const [{ default: JSZip }, { saveAs }] =
                            await Promise.all([
                              import("jszip"),
                              import("file-saver"),
                            ]);

                          const zip = new JSZip();

                          for (let i = 0; i < lines.length; i++) {
                            const value = lines[i];
                            const isUrl = /^https?:\/\//i.test(value);
                            const dataUrl = await QRCodeService.generateQRCode(
                              isUrl
                                ? { type: "url", url: value }
                                : { type: "text", text: value },
                              undefined,
                              {
                                format: "png",
                                size: 1024,
                                margin: 2,
                                errorCorrectionLevel: "M",
                              }
                            );
                            const res = await fetch(dataUrl);
                            const blob = await res.blob();
                            const idx = String(i + 1).padStart(3, "0");
                            zip.file(`qr-${idx}.png`, blob);
                          }

                          const out = await zip.generateAsync({ type: "blob" });
                          saveAs(out, `tecsoqr-bulk-${Date.now()}.zip`);
                          toast({
                            title: "ZIP ready",
                            description: `${lines.length} QR codes downloaded.`,
                            status: "success",
                          });
                        } catch (e) {
                          console.error(e);
                          toast({
                            title: "Failed to generate ZIP",
                            status: "error",
                          });
                        } finally {
                          setLoading(false);
                        }
                      }}
                      isDisabled={loading}
                    >
                      {loading ? (
                        <HStack>
                          <Spinner size="sm" />
                          <span>Working...</span>
                        </HStack>
                      ) : (
                        "Generate ZIP"
                      )}
                    </Button>
                    <Text fontSize="sm" color={textColor}>
                      Plan: {plan}
                    </Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card variant={neon ? "neon" : undefined}>
              <CardBody>
                <Heading size="sm">Tips</Heading>
                <UnorderedList mt={2} color={textColor}>
                  <ListItem>
                    Lines starting with http or https are treated as URLs.
                  </ListItem>
                  <ListItem>Other lines are encoded as plain text.</ListItem>
                  <ListItem>
                    Use the main generator for advanced types.
                  </ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};
