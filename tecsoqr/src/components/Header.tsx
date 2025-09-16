import { Box, Heading, Text } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box textAlign="center" py={8}>
      <Heading as="h1" size="2xl" color="blue.600">
        TECSOQR
      </Heading>
      <Text mt={2} fontSize="lg">
        Create Custom QR Codes for Free
      </Text>
    </Box>
  );
};