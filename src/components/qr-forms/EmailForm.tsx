import { Input, Textarea, VStack } from '@chakra-ui/react';
import type { QRCodeEmail } from '../../types/qr-code';
import { QRForm, QRFormField } from './QRForm';

interface EmailFormProps {
  value: QRCodeEmail;
  onChange: (value: QRCodeEmail) => void;
}

export const EmailForm = ({ value, onChange }: EmailFormProps) => {
  const handleChange = (field: keyof QRCodeEmail) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <QRForm value={value} onChange={onChange}>
      <VStack spacing={4} align="stretch">
        <QRFormField label="Email Address" isRequired>
          <Input
            type="email"
            placeholder="example@domain.com"
            value={value.email}
            onChange={handleChange('email')}
          />
        </QRFormField>

        <QRFormField label="Subject">
          <Input
            placeholder="Email subject"
            value={value.subject}
            onChange={handleChange('subject')}
          />
        </QRFormField>

        <QRFormField label="Message">
          <Textarea
            placeholder="Email body"
            value={value.body}
            onChange={handleChange('body')}
            rows={4}
          />
        </QRFormField>
      </VStack>
    </QRForm>
  );
};