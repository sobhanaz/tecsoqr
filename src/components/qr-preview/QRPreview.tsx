import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import type {
  QRCodeContent,
  QRCodeCustomization,
  QRCodeOutput,
} from "@/types/qr-code";
import { QRCodeService } from "@/services/qr-code.service";
import { DownloadIcon } from "@chakra-ui/icons";

interface QRPreviewProps {
  content: QRCodeContent;
  customization?: QRCodeCustomization;
}

export const QRPreview = ({ content, customization }: QRPreviewProps) => {
  const [qrCode, setQrCode] = useState<string>("");
  const [size, setSize] = useState<number>(300);
  const toast = useToast();
  const hasShownErrorToast = useRef(false);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const output: QRCodeOutput = {
          format: "svg",
          size: Math.max(size, 300), // Ensure minimum size for better visibility
          margin: 4,
          errorCorrectionLevel: "M",
        };

        const qrCodeData = await QRCodeService.generateQRCode(
          content,
          customization,
          output
        );
        if (typeof qrCodeData === "string" && qrCodeData.startsWith("<svg")) {
          setQrCode(qrCodeData);
          // Reset error toast flag on successful generation
          hasShownErrorToast.current = false;
        } else {
          console.error("Invalid QR code data received:", qrCodeData);
          if (!hasShownErrorToast.current) {
            hasShownErrorToast.current = true;
            toast({
              title: "⚠️ Generation Failed",
              description: "Unable to create QR code. Please check your input.",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "bottom-left",
              variant: "solid",
            });
          }
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
        if (!hasShownErrorToast.current) {
          hasShownErrorToast.current = true;
          toast({
            title: "⚠️ Generation Error",
            description:
              "Something went wrong. Please verify your data and try again.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "bottom-left",
            variant: "solid",
          });
        }
      }
    };

    generateQRCode();
  }, [content, customization, size, toast]);

  const handleDownload = async (format: QRCodeOutput["format"]) => {
    try {
      const output: QRCodeOutput = {
        format,
        size: Math.max(size, 1000), // Use higher resolution for downloads
        margin: 4,
        errorCorrectionLevel: "M",
      };

      const qrCodeData = await QRCodeService.generateQRCode(
        content,
        customization,
        output
      );

      // Create a download link
      const link = document.createElement("a");
      const fileName = `qrcode.${format}`;

      if (format === "svg") {
        const blob = new Blob([qrCodeData], { type: "image/svg+xml" });
        link.href = URL.createObjectURL(blob);
      } else {
        link.href = qrCodeData;
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "📥 Download Complete!",
        description: `QR code saved as ${fileName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
        variant: "subtle",
      });
    } catch {
      toast({
        title: "😱 Download Failed",
        description: "Unable to save the file. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
        variant: "solid",
      });
    }
  };

  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      shadow="sm"
      _dark={{ bg: "gray.800" }}
    >
      <VStack spacing={6}>
        <Center
          w="100%"
          h={`${size}px`}
          position="relative"
          bg="gray.50"
          _dark={{ bg: "gray.700" }}
          borderRadius="md"
          overflow="hidden"
        >
          {qrCode ? (
            <Box
              dangerouslySetInnerHTML={{ __html: qrCode }}
              w={`${size}px`}
              h={`${size}px`}
              display="flex"
              alignItems="center"
              justifyContent="center"
            />
          ) : (
            <Text>Generating QR code...</Text>
          )}
        </Center>

        <VStack spacing={4} w="100%">
          <HStack w="100%" spacing={4}>
            <Text fontSize="sm" whiteSpace="nowrap">
              Size:
            </Text>
            <Slider
              value={size}
              min={100}
              max={500}
              step={10}
              onChange={setSize}
              aria-label="QR code size"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm" w="60px">
              {size}px
            </Text>
          </HStack>

          <ButtonGroup variant="outline" spacing={4}>
            <Button
              leftIcon={<DownloadIcon />}
              onClick={() => handleDownload("svg")}
            >
              SVG
            </Button>
            <Button
              leftIcon={<DownloadIcon />}
              onClick={() => handleDownload("png")}
            >
              PNG
            </Button>
          </ButtonGroup>
        </VStack>
      </VStack>
    </Box>
  );
};
