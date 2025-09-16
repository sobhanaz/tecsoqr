import { Box, Button, VStack } from '@chakra-ui/react';
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
    <Box p={4} borderRadius="lg" bg="white" shadow="base" textAlign="center">
      <VStack spacing={4}>
        {content && (
          <QRCodeCanvas
            ref={qrRef}
            value={content}
            size={size}
            fgColor={foregroundColor}
            bgColor={backgroundColor}
            level={level}
            includeMargin={true}
          />
        )}
        {content && (
          <Button colorScheme="blue" onClick={downloadQRCode}>
            Download QR Code
          </Button>
        )}
      </VStack>
    </Box>
  );
};