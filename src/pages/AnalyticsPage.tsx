import {
  Badge,
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNeonMode } from "@/theme/useNeonMode";
import { useSubscription } from "@/hooks/useSubscription";

export const AnalyticsPage = () => {
  const { neon } = useNeonMode();
  const { hasFeature } = useSubscription();
  const textColor = useColorModeValue("gray.600", "gray.300");

  const allowed = hasFeature("analytics");

  return (
    <Box py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading layerStyle={neon ? "neonText" : undefined}>
            Analytics
          </Heading>

          {!allowed ? (
            <Card variant={neon ? "neon" : undefined}>
              <CardBody>
                <VStack align="start" spacing={3}>
                  <Badge colorScheme="pink">Pro feature</Badge>
                  <Text color={textColor}>
                    Analytics are available on Pro and Enterprise plans. Upgrade
                    to unlock scan counts, top locations, devices, and more.
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Card variant={neon ? "neon" : undefined}>
                <CardBody>
                  <Stat>
                    <StatLabel>Total Scans</StatLabel>
                    <StatNumber>12,345</StatNumber>
                    <StatHelpText>This month</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              <Card variant={neon ? "neon" : undefined}>
                <CardBody>
                  <Stat>
                    <StatLabel>Unique Users</StatLabel>
                    <StatNumber>3,210</StatNumber>
                    <StatHelpText>This month</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              <Card variant={neon ? "neon" : undefined}>
                <CardBody>
                  <Stat>
                    <StatLabel>Top Country</StatLabel>
                    <StatNumber>US</StatNumber>
                    <StatHelpText>42% of scans</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};
