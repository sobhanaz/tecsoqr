import { Input } from '@chakra-ui/react';
import type { QRCodeURL } from '@/types/qr-code';
import { QRForm, QRFormField } from './QRForm';

interface URLFormProps {
  value: QRCodeURL;
  onChange: (value: QRCodeURL) => void;
}

export const URLForm = ({ value, onChange }: URLFormProps) => {
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      url: e.target.value,
    });
  };

  return (
    <QRForm value={value} onChange={onChange}>
      <QRFormField label="URL" isRequired>
        <Input
          type="url"
          placeholder="https://example.com"
          value={value.url}
          onChange={handleURLChange}
        />
      </QRFormField>
    </QRForm>
  );
};