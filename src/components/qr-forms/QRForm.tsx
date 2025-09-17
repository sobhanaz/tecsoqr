import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import type { QRCodeContent } from '../types/qr-code';
import { ReactNode } from 'react';

interface QRFormProps<T extends QRCodeContent> {
  value: T;
  onChange: (value: T) => void;
  children?: ReactNode;
}

export const QRForm = <T extends QRCodeContent>({ children }: QRFormProps<T>) => {
  return (
    <Box p={4} bg="white" borderRadius="md" shadow="sm" _dark={{ bg: 'gray.800' }}>
      {children}
    </Box>
  );
};

interface QRFormFieldProps {
  label: string;
  children: ReactNode;
  isRequired?: boolean;
}

export const QRFormField = ({ label, children, isRequired }: QRFormFieldProps) => {
  return (
    <FormControl isRequired={isRequired} mb={4}>
      <FormLabel>{label}</FormLabel>
      {children}
    </FormControl>
  );
};