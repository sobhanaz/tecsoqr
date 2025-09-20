import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import type { QRCodeCustomization } from "@/types/qr-code";

interface QRCustomizationProps {
  value: QRCodeCustomization;
  onChange: (value: QRCodeCustomization) => void;
}

export const QRCustomization = ({ value, onChange }: QRCustomizationProps) => {
  const { colorMode } = useColorMode();
  const defaultForeground = colorMode === "dark" ? "#FFFFFF" : "#000000";
  const defaultBackground = colorMode === "dark" ? "#1A202C" : "#FFFFFF";

  const handleColorChange =
    (field: keyof Pick<QRCodeCustomization, "foreground" | "background">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        [field]: e.target.value,
      });
    };

  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      shadow="sm"
      _dark={{ bg: "gray.800" }}
    >
      <VStack spacing={6} align="stretch">
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel>Foreground Color</FormLabel>
            <HStack>
              <Input
                type="color"
                value={value.foreground || defaultForeground}
                onChange={handleColorChange("foreground")}
                w="100px"
              />
              <Input
                value={value.foreground || defaultForeground}
                onChange={handleColorChange("foreground")}
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
                onChange={handleColorChange("background")}
                w="100px"
              />
              <Input
                value={value.background || defaultBackground}
                onChange={handleColorChange("background")}
                placeholder="#FFFFFF"
              />
            </HStack>
          </FormControl>
        </Grid>
      </VStack>
    </Box>
  );
};
