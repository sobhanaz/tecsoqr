import {
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import type { QRCodeVCard } from '@/types/qr-code';
import { QRForm, QRFormField } from './QRForm';

interface VCardFormProps {
  value: QRCodeVCard;
  onChange: (value: QRCodeVCard) => void;
}

export const VCardForm = ({ value, onChange }: VCardFormProps) => {
  const handleChange = (field: keyof QRCodeVCard) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <QRForm value={value} onChange={onChange}>
      <VStack spacing={4} align="stretch">
        <SimpleGrid columns={2} spacing={4}>
          <QRFormField label="First Name" isRequired>
            <Input
              placeholder="John"
              value={value.firstName}
              onChange={handleChange('firstName')}
            />
          </QRFormField>

          <QRFormField label="Last Name" isRequired>
            <Input
              placeholder="Doe"
              value={value.lastName}
              onChange={handleChange('lastName')}
            />
          </QRFormField>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={4}>
          <QRFormField label="Organization">
            <Input
              placeholder="Company Name"
              value={value.organization}
              onChange={handleChange('organization')}
            />
          </QRFormField>

          <QRFormField label="Job Title">
            <Input
              placeholder="Job Title"
              value={value.title}
              onChange={handleChange('title')}
            />
          </QRFormField>
        </SimpleGrid>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <VStack spacing={4} align="stretch">
              <QRFormField label="Work Phone">
                <Input
                  type="tel"
                  placeholder="+1234567890"
                  value={value.workPhone}
                  onChange={handleChange('workPhone')}
                />
              </QRFormField>

              <QRFormField label="Home Phone">
                <Input
                  type="tel"
                  placeholder="+1234567890"
                  value={value.homePhone}
                  onChange={handleChange('homePhone')}
                />
              </QRFormField>

              <QRFormField label="Mobile Phone">
                <Input
                  type="tel"
                  placeholder="+1234567890"
                  value={value.mobilePhone}
                  onChange={handleChange('mobilePhone')}
                />
              </QRFormField>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={4} align="stretch">
              <QRFormField label="Email">
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={value.email}
                  onChange={handleChange('email')}
                />
              </QRFormField>

              <QRFormField label="Website">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={value.website}
                  onChange={handleChange('website')}
                />
              </QRFormField>
            </VStack>
          </GridItem>
        </Grid>

        <VStack spacing={4} align="stretch">
          <QRFormField label="Street Address">
            <Input
              placeholder="123 Main St"
              value={value.street}
              onChange={handleChange('street')}
            />
          </QRFormField>

          <SimpleGrid columns={2} spacing={4}>
            <QRFormField label="City">
              <Input
                placeholder="City"
                value={value.city}
                onChange={handleChange('city')}
              />
            </QRFormField>

            <QRFormField label="State">
              <Input
                placeholder="State"
                value={value.state}
                onChange={handleChange('state')}
              />
            </QRFormField>
          </SimpleGrid>

          <SimpleGrid columns={2} spacing={4}>
            <QRFormField label="ZIP Code">
              <Input
                placeholder="ZIP Code"
                value={value.zipCode}
                onChange={handleChange('zipCode')}
              />
            </QRFormField>

            <QRFormField label="Country">
              <Input
                placeholder="Country"
                value={value.country}
                onChange={handleChange('country')}
              />
            </QRFormField>
          </SimpleGrid>
        </VStack>
      </VStack>
    </QRForm>
  );
};