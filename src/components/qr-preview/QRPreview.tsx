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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { QRCodeContent, QRCodeCustomization, QRCodeOutput } from '../../types/qr-code';
import { QRCodeService } from '../../services/qr-code.service';
import { DownloadIcon } from '@chakra-ui/icons';

interface QRPreviewProps {
  content: QRCodeContent;
  customization?: QRCodeCustomization;
}

export const QRPreview = ({ content, customization }: QRPreviewProps) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [size, setSize] = useState<number>(300);
  const toast = useToast();

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const output: QRCodeOutput = {
          format: 'svg',
          size,
          margin: 4,
          errorCorrectionLevel: 'M',
        };

        const qrCodeData = await QRCodeService.generateQRCode(content, customization, output);
        setQrCode(qrCodeData);
      } catch (error) {
        toast({
          title: 'Error generating QR code',
          description: 'Please check your input and try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    generateQRCode();
  }, [content, customization, size, toast]);

  const handleDownload = async (format: QRCodeOutput['format']) => {
    try {
      const output: QRCodeOutput = {
        format,
        size: Math.max(size, 1000), // Use higher resolution for downloads
        margin: 4,
        errorCorrectionLevel: 'M',
      };

      const qrCodeData = await QRCodeService.generateQRCode(content, customization, output);
      
      // Create a download link
      const link = document.createElement('a');
      const fileName = `qrcode.${format}`;

      if (format === 'svg') {
        const blob = new Blob([qrCodeData], { type: 'image/svg+xml' });
        link.href = URL.createObjectURL(blob);
      } else {
        link.href = qrCodeData;
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'QR code downloaded',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error downloading QR code',
        description: 'Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} bg="white" borderRadius="md" shadow="sm" _dark={{ bg: 'gray.800' }}>
      <VStack spacing={6}>
        <Center
          w="100%"
          h={`${size}px`}
          position="relative"
          bg="gray.50"
          _dark={{ bg: 'gray.700' }}
          borderRadius="md"
        >
          {qrCode ? (
            <Box
              dangerouslySetInnerHTML={{ __html: qrCode }}
              w={`${size}px`}
              h={`${size}px`}
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
              onClick={() => handleDownload('svg')}
            >
              SVG
            </Button>
            <Button
              leftIcon={<DownloadIcon />}
              onClick={() => handleDownload('png')}
            >
              PNG
            </Button>
          </ButtonGroup>
        </VStack>
      </VStack>
    </Box>
  );
};