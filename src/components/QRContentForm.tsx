import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface QRContentFormProps {
  type: string;
  onChange: (content: string) => void;
}

export const QRContentForm = ({ type, onChange }: QRContentFormProps) => {
  const [formData, setFormData] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(value);
    onChange(value);
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'url':
        return 'Enter URL (e.g., https://www.example.com)';
      case 'text':
        return 'Enter your text';
      case 'email':
        return 'Enter email address';
      case 'phone':
        return 'Enter phone number';
      case 'sms':
        return 'Enter phone number';
      case 'vcard':
        return 'Enter name';
      case 'location':
        return 'Enter address';
      case 'wifi':
        return 'Enter network name';
      case 'event':
        return 'Enter event title';
      default:
        return 'Enter content';
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>{type.toUpperCase()}</FormLabel>
        <Input
          placeholder={getPlaceholder()}
          value={formData}
          onChange={handleChange}
          size="lg"
        />
      </FormControl>
    </VStack>
  );
};