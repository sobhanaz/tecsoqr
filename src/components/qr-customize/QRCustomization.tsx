import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  Radio,
  RadioGroup,

  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import type { QRCodeCustomization } from '../../types/qr-code';

interface QRCustomizationProps {
  value: QRCodeCustomization;
  onChange: (value: QRCodeCustomization) => void;
}

export const QRCustomization = ({ value, onChange }: QRCustomizationProps) => {
  const { colorMode } = useColorMode();
  const defaultForeground = colorMode === 'dark' ? '#FFFFFF' : '#000000';
  const defaultBackground = colorMode === 'dark' ? '#1A202C' : '#FFFFFF';

  const handleColorChange = (field: keyof Pick<QRCodeCustomization, 'foreground' | 'background'>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        ...value,
        logo: {
          file,
          size: value.logo?.size || 25,
        },
      });
    }
  }, [value, onChange]);

  const handleLogoSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    if (value.logo) {
      onChange({
        ...value,
        logo: {
          ...value.logo,
          size: Math.min(Math.max(size, 1), 30),
        },
      });
    }
  };

  const handleStyleChange = (field: keyof Pick<QRCodeCustomization, 'cornerStyle' | 'dotStyle'>) => (
    newValue: string
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <Box p={4} bg="white" borderRadius="md" shadow="sm" _dark={{ bg: 'gray.800' }}>
      <VStack spacing={6} align="stretch">
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel>Foreground Color</FormLabel>
            <HStack>
              <Input
                type="color"
                value={value.foreground || defaultForeground}
                onChange={handleColorChange('foreground')}
                w="100px"
              />
              <Input
                value={value.foreground || defaultForeground}
                onChange={handleColorChange('foreground')}
                placeholder="#000000"
              />
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Background Color</FormLabel>
            <HStack>
              <Input
                type="color"
                value={value.background || defaultBackground}
                onChange={handleColorChange('background')}
                w="100px"
              />
              <Input
                value={value.background || defaultBackground}
                onChange={handleColorChange('background')}
                placeholder="#FFFFFF"
              />
            </HStack>
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel>Logo</FormLabel>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ display: 'none' }}
            id="logo-upload"
          />
          <HStack>
            <Button as="label" htmlFor="logo-upload">
              Upload Logo
            </Button>
            {value.logo && (
              <Input
                type="number"
                min={1}
                max={30}
                value={value.logo.size}
                onChange={handleLogoSizeChange}
                placeholder="Logo size %"
                w="100px"
              />
            )}
          </HStack>
        </FormControl>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel>Corner Style</FormLabel>
            <RadioGroup
              value={value.cornerStyle || 'square'}
              onChange={handleStyleChange('cornerStyle')}
            >
              <VStack align="start">
                <Radio value="square">Square</Radio>
                <Radio value="rounded">Rounded</Radio>
                <Radio value="dots">Dots</Radio>
              </VStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Dot Style</FormLabel>
            <RadioGroup
              value={value.dotStyle || 'square'}
              onChange={handleStyleChange('dotStyle')}
            >
              <VStack align="start">
                <Radio value="square">Square</Radio>
                <Radio value="rounded">Rounded</Radio>
                <Radio value="dots">Dots</Radio>
              </VStack>
            </RadioGroup>
          </FormControl>
        </Grid>
      </VStack>
    </Box>
  );
};