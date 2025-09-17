import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  SimpleGrid,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
} from '@chakra-ui/react';
import { AddIcon, DownloadIcon } from '@chakra-ui/icons';

interface QRFormProps {
  onUpdate: (data: QRCodeData) => void;
  type: string;
}

export interface QRCodeData {
  content: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
}

const isValidInput = (type: string, content: string): boolean => {
  switch (type) {
    case 'url':
      try {
        new URL(content.startsWith('http') ? content : `https://${content}`);
        return true;
      } catch {
        return false;
      }
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content);
    case 'phone':
      return /^\+?[\d\s-]{6,}$/.test(content);
    case 'wifi':
      const [ssid] = content.split(',');
      return ssid.length > 0;
    default:
      return content.length > 0;
  }
};

const getErrorMessage = (type: string, content: string): string => {
  switch (type) {
    case 'url':
      return 'Please enter a valid URL';
    case 'email':
      return 'Please enter a valid email address';
    case 'phone':
      return 'Please enter a valid phone number';
    case 'wifi':
      return 'Please enter a valid WiFi SSID';
    default:
      return 'This field is required';
  }
};

const getInputHelper = (type: string): string => {
  switch (type) {
    case 'url':
      return 'Enter a website URL (e.g., https://example.com)';
    case 'email':
      return 'Enter a valid email address';
    case 'phone':
      return 'Enter a phone number with country code';
    case 'wifi':
      return 'Enter WiFi SSID and password, separated by comma';
    default:
      return 'Enter the content for your QR code';
  }
};

const getPlaceholder = (type: string) => {
  switch (type) {
    case 'url':
      return 'Enter website URL (e.g., https://example.com)';
    case 'text':
      return 'Enter text content';
    case 'email':
      return 'Enter email address';
    case 'phone':
      return 'Enter phone number';
    case 'sms':
      return 'Enter phone number for SMS';
    case 'vcard':
      return 'Enter contact information';
    case 'location':
      return 'Enter address or coordinates';
    case 'wifi':
      return 'Enter WiFi network details';
    case 'event':
      return 'Enter event details';
    default:
      return 'Enter content';
  }
};

const formatContent = (type: string, content: string) => {
  switch (type) {
    case 'url':
      return content.startsWith('http') ? content : `https://${content}`;
    case 'email':
      return `mailto:${content}`;
    case 'phone':
      return `tel:${content.replace(/[^\d+]/g, '')}`;
    case 'sms':
      return `sms:${content.replace(/[^\d+]/g, '')}`;
    case 'wifi':
      const [ssid, pass, type = 'WPA'] = content.split(',');
      return `WIFI:S:${ssid};T:${type};P:${pass};;`;
    default:
      return content;
  }
};

export const QRForm = ({ onUpdate, type }: QRFormProps) => {
  const [formData, setFormData] = useState<QRCodeData>({
    content: '',
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    size: 256,
    level: 'M',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: name === 'content' ? formatContent(type, value) : value,
    };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <Box>
      <FormControl 
        mb={4} 
        isInvalid={formData.content !== '' && !isValidInput(type, formData.content)}
        role="group"
        aria-labelledby={`${type}-label`}
      >
        <FormLabel id={`${type}-label`}>
          {type.toUpperCase()}
        </FormLabel>
        <Input
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder={getPlaceholder(type)}
          size="lg"
          bg="white"
          aria-label={`Enter ${type} for QR code generation`}
          aria-describedby={`${type}-helper`}
          required
        />
        <FormHelperText id={`${type}-helper`}>
          {getInputHelper(type)}
        </FormHelperText>
        {formData.content !== '' && !isValidInput(type, formData.content) && (
          <FormErrorMessage>
            {getErrorMessage(type, formData.content)}
          </FormErrorMessage>
        )}
      </FormControl>

      <Accordion allowMultiple defaultIndex={[0]}>
        <AccordionItem border="none">
          <AccordionButton bg="white" p={4} borderRadius="lg" mb={2}>
            <HStack flex="1" justify="space-between">
              <Text fontWeight="semibold">Set Colors</Text>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={[1, 2]} spacing={4}>
              <FormControl>
                <FormLabel>Foreground Color</FormLabel>
                <Input
                  name="foregroundColor"
                  type="color"
                  value={formData.foregroundColor}
                  onChange={handleChange}
                  h="40px"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Background Color</FormLabel>
                <Input
                  name="backgroundColor"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={handleChange}
                  h="40px"
                />
              </FormControl>
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton bg="white" p={4} borderRadius="lg" mb={2}>
            <HStack flex="1" justify="space-between">
              <Text fontWeight="semibold">Add Logo Image</Text>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Button leftIcon={<AddIcon />} variant="outline" w="100%">
              Upload Logo Image
            </Button>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton bg="white" p={4} borderRadius="lg">
            <HStack flex="1" justify="space-between">
              <Text fontWeight="semibold">Customize Design</Text>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={[1, 2]} spacing={4}>
              <FormControl>
                <FormLabel>Size</FormLabel>
                <Select name="size" value={formData.size} onChange={handleChange}>
                  <option value={128}>Small (128px)</option>
                  <option value={256}>Medium (256px)</option>
                  <option value={512}>Large (512px)</option>
                  <option value={1024}>Extra Large (1024px)</option>
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      
      <Box mt={6}>
        <Button
          colorScheme="blue"
          size="lg"
          width="100%"
          leftIcon={<DownloadIcon />}
          isDisabled={!formData.content}
        >
          Download QR Code
        </Button>
      </Box>
    </Box>
  );
};