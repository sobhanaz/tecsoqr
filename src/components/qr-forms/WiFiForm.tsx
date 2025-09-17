import { Input, Select, Switch, VStack } from '@chakra-ui/react';
import type { QRCodeWiFi } from '../../types/qr-code';
import { QRForm, QRFormField } from './QRForm';

interface WiFiFormProps {
  value: QRCodeWiFi;
  onChange: (value: QRCodeWiFi) => void;
}

export const WiFiForm = ({ value, onChange }: WiFiFormProps) => {
  const handleChange = (field: keyof QRCodeWiFi) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  const handleHiddenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      hidden: e.target.checked,
    });
  };

  return (
    <QRForm value={value} onChange={onChange}>
      <VStack spacing={4} align="stretch">
        <QRFormField label="Network Name (SSID)" isRequired>
          <Input
            placeholder="Enter network name"
            value={value.ssid}
            onChange={handleChange('ssid')}
          />
        </QRFormField>

        <QRFormField label="Password">
          <Input
            type="password"
            placeholder="Enter network password"
            value={value.password}
            onChange={handleChange('password')}
          />
        </QRFormField>

        <QRFormField label="Encryption" isRequired>
          <Select value={value.encryption} onChange={handleChange('encryption')}>
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </Select>
        </QRFormField>

        <QRFormField label="Hidden Network">
          <Switch
            isChecked={value.hidden}
            onChange={handleHiddenChange}
          />
        </QRFormField>
      </VStack>
    </QRForm>
  );
};