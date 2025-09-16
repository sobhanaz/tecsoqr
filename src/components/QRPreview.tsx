import { Box, Button, VStack } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

interface QRPreviewProps {
  content: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
}

export const QRPreview = ({ content, foregroundColor, backgroundColor, size, level }: QRPreviewProps) => {
  const qrRef = useRef<HTMLCanvasElement>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current;
    const image = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qrcode-${content.substring(0, 20)}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <Box p={[3, 4]} borderRadius="lg" bg="white" shadow="base" textAlign="center" width="100%" maxW="600px" mx="auto">
      <VStack spacing={4}>
        {content && (
          <Box overflow="auto" p={2}>
            <QRCodeCanvas
              ref={qrRef}
              value={content}
              size={Math.min(size, window.innerWidth - 64)}
              fgColor={foregroundColor}
              bgColor={backgroundColor}
              level={level}
              includeMargin={true}
            />
          </Box>
        )}
        {content && (
          <Button
            colorScheme="blue"
            onClick={downloadQRCode}
            size="lg"
            width={["100%", "auto"]}
            leftIcon={<DownloadIcon />}
          >
            Download QR Code
          </Button>
        )}
      </VStack>
    </Box>
  );
};