import { Textarea } from '@chakra-ui/react';
import type { QRCodeText } from '@/types/qr-code';
import { QRForm, QRFormField } from './QRForm';

interface TextFormProps {
  value: QRCodeText;
  onChange: (value: QRCodeText) => void;
}

export const TextForm = ({ value, onChange }: TextFormProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...value,
      text: e.target.value,
    });
  };

  return (
    <QRForm value={value} onChange={onChange}>
      <QRFormField label="Text" isRequired>
        <Textarea
          placeholder="Enter your text here..."
          value={value.text}
          onChange={handleTextChange}
          rows={4}
        />
      </QRFormField>
    </QRForm>
  );
};