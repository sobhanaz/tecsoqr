import { useState } from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  VStack,
  SimpleGrid,
  Select,
} from '@chakra-ui/react';

interface QRFormProps {
  onUpdate: (data: QRCodeData) => void;
}

export interface QRCodeData {
  content: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
}

export const QRForm = ({ onUpdate }: QRFormProps) => {
  const [formData, setFormData] = useState<QRCodeData>({
    content: '',
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    size: 256,
    level: 'M',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <Box p={4} borderRadius="lg" bg="white" shadow="base">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Input
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter URL or text"
          />
        </FormControl>

        <SimpleGrid columns={2} spacing={4} width="100%">
          <FormControl>
            <FormLabel>Foreground Color</FormLabel>
            <Input
              name="foregroundColor"
              type="color"
              value={formData.foregroundColor}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Background Color</FormLabel>
            <Input
              name="backgroundColor"
              type="color"
              value={formData.backgroundColor}
              onChange={handleChange}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={4} width="100%">
          <FormControl>
            <FormLabel>Size</FormLabel>
            <Select name="size" value={formData.size} onChange={handleChange}>
              <option value={128}>Small (128px)</option>
              <option value={256}>Medium (256px)</option>
              <option value={512}>Large (512px)</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Error Correction</FormLabel>
            <Select name="level" value={formData.level} onChange={handleChange}>
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="Q">High</option>
              <option value="H">Highest</option>
            </Select>
          </FormControl>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};