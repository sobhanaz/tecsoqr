import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useColorModeValue,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useNeonMode } from "@/theme/useNeonMode";
import { useSubscription } from "@/hooks/useSubscription";

export const ContactPage = () => {
  const { neon } = useNeonMode();
  const { features } = useSubscription();
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box py={12}>
      <Container maxW="container.sm">
        <VStack spacing={8} align="stretch">
          <Heading layerStyle={neon ? "neonText" : undefined}>
            Contact Support
          </Heading>
          <Card variant={neon ? "neon" : undefined}>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Text color={textColor}>
                  Have a question or need help? Send us a message and we'll get
                  back to you soon.
                </Text>
                {features.prioritySupport && (
                  <HStack>
                    <Badge colorScheme="green">Priority support</Badge>
                    <Text fontSize="sm" color={textColor}>
                      Responses typically within 2 hours.
                    </Text>
                  </HStack>
                )}
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Your name" />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="you@example.com" />
                </FormControl>
                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea rows={6} placeholder="How can we help?" />
                </FormControl>
                <Button alignSelf="flex-end" variant={neon ? "neon" : "solid"}>
                  Send
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};
