import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FiLink,
  FiFileText,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiUser,
  FiMapPin,
  FiWifi,
  FiCalendar,
} from 'react-icons/fi';
import { QRForm } from './QRForm';
import type { QRCodeData } from './QRForm';

const contentTypes = [
  { id: 'url', label: 'URL', icon: FiLink },
  { id: 'text', label: 'TEXT', icon: FiFileText },
  { id: 'email', label: 'EMAIL', icon: FiMail },
  { id: 'phone', label: 'PHONE', icon: FiPhone },
  { id: 'sms', label: 'SMS', icon: FiMessageSquare },
  { id: 'vcard', label: 'VCARD', icon: FiUser },
  { id: 'location', label: 'LOCATION', icon: FiMapPin },
  { id: 'wifi', label: 'WIFI', icon: FiWifi },
  { id: 'event', label: 'EVENT', icon: FiCalendar },
];

interface ContentTabsProps {
  onUpdate: (data: QRCodeData) => void;
}

export const ContentTabs = ({ onUpdate }: ContentTabsProps) => {
  return (
    <Box bg="white" borderRadius="lg" p={4} shadow="base">
      <Tabs variant="soft-rounded" colorScheme="brand" isLazy>
        <TabList
          overflowX="auto"
          overflowY="hidden"
          py={2}
          sx={{
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {contentTypes.map((type) => (
            <Tab
              key={type.id}
              mx={1}
              px={4}
              py={3}
              _selected={{
                bg: 'brand.500',
                color: 'white',
              }}
            >
              <VStack spacing={1}>
                <Icon as={type.icon} boxSize={5} />
                <Text fontSize="sm" fontWeight="medium">
                  {type.label}
                </Text>
              </VStack>
            </Tab>
          ))}
        </TabList>

        <TabPanels pt={4}>
          {contentTypes.map((type) => (
            <TabPanel key={type.id} px={0}>
              <QRForm type={type.id} onUpdate={onUpdate} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};