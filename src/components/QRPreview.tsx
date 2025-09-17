import { Box, Button, VStack, Skeleton, useToast } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';

interface QRPreviewProps {
  content: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
}

export const QRPreview = ({ content, foregroundColor, backgroundColor, size, level }: QRPreviewProps) => {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const downloadQRCode = async () => {
    if (!qrRef.current) return;
    
    try {
      setIsLoading(true);
      const canvas = qrRef.current;
      const image = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = image;
      anchor.download = `qrcode-${content.substring(0, 20)}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      toast({
        title: 'Download Started',
        description: 'Your QR code is being downloaded.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Failed to download QR code. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      p={[3, 4]} 
      borderRadius="lg" 
      bg="white" 
      shadow="base" 
      textAlign="center" 
      width="100%" 
      maxW="600px" 
      mx="auto"
      role="region"
      aria-label="QR Code Preview"
    >
      <VStack spacing={4}>
        {content ? (
          <Box overflow="auto" p={2}>
            <QRCodeCanvas
              ref={qrRef}
              value={content}
              size={Math.min(size, window.innerWidth - 64)}
              fgColor={foregroundColor}
              bgColor={backgroundColor}
              level={level}
              includeMargin={true}
              aria-label={`QR code for ${content}`}
            />
          </Box>
        ) : (
          <Skeleton 
            height={size} 
            width={size}
            startColor="gray.100" 
            endColor="gray.300"
            borderRadius="md"
          />
        )}
        <Button
          colorScheme="blue"
          onClick={downloadQRCode}
          size="lg"
          width={["100%", "auto"]}
          leftIcon={<DownloadIcon />}
          isLoading={isLoading}
          isDisabled={!content}
          loadingText="Downloading..."
          aria-label="Download QR code as PNG image"
        >
          Download QR Code
        </Button>
      </VStack>
    </Box>
  );
};