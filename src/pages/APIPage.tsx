import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Button,
  useColorModeValue,
  Badge,
  SimpleGrid,
  Code,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { FaCode, FaKey, FaRocket, FaShieldAlt } from "react-icons/fa";
import { useNeonMode } from "@/theme/useNeonMode";

const CodeBlock = ({
  children,
  language = "javascript",
}: {
  children: string;
  language?: string;
}) => {
  const { neon } = useNeonMode();
  const codeBg = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const codeColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      as="pre"
      p={4}
      bg={neon ? "rgba(10,10,18,0.8)" : codeBg}
      borderRadius="md"
      overflow="auto"
      border="1px solid"
      borderColor={neon ? "neon.purple" : borderColor}
      fontFamily="mono"
      fontSize="sm"
      position="relative"
    >
      <Badge
        position="absolute"
        top={2}
        right={2}
        colorScheme={neon ? "pink" : "blue"}
        variant="solid"
        fontSize="xs"
      >
        {language}
      </Badge>
      <Code
        display="block"
        whiteSpace="pre"
        bg="transparent"
        color={neon ? "neon.cyan" : codeColor}
      >
        {children}
      </Code>
    </Box>
  );
};

const EndpointCard = ({
  method,
  endpoint,
  description,
  example,
}: {
  method: string;
  endpoint: string;
  description: string;
  example: string;
}) => {
  const { neon } = useNeonMode();

  const methodColors: Record<string, string> = {
    GET: "green",
    POST: "blue",
    PUT: "orange",
    DELETE: "red",
  };

  return (
    <Card variant={neon ? "neon" : undefined}>
      <CardBody>
        <VStack align="start" spacing={4}>
          <HStack>
            <Badge
              colorScheme={methodColors[method] || "gray"}
              fontWeight="bold"
            >
              {method}
            </Badge>
            <Code
              fontSize="md"
              color={neon ? "neon.cyan" : "blue.600"}
              bg="transparent"
            >
              {endpoint}
            </Code>
          </HStack>
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            {description}
          </Text>
          <Box w="full">
            <Text fontWeight="semibold" mb={2}>
              Example:
            </Text>
            <CodeBlock>{example}</CodeBlock>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export const APIPage = () => {
  const { neon } = useNeonMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const quickStartExample = `// Install the TECSOQR SDK
npm install @tecsoqr/sdk

// Basic usage
import { TecsoQR } from '@tecsoqr/sdk';

const qr = new TecsoQR({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.tecsoqr.com/v1'
});

// Generate a QR code
const result = await qr.generate({
  type: 'url',
  content: 'https://example.com',
  customization: {
    foreground: '#000000',
    background: '#FFFFFF',
    size: 300
  }
});

console.log(result.qrCodeUrl);`;

  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/generate",
      description: "Generate a QR code with custom content and styling options",
      example: `fetch('https://api.tecsoqr.com/v1/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    type: 'url',
    content: 'https://example.com',
    customization: {
      foreground: '#ff36d2',
      background: '#ffffff',
      size: 512
    }
  })
});`,
    },
    {
      method: "GET",
      endpoint: "/api/v1/templates",
      description: "Retrieve available QR code templates and presets",
      example: `fetch('https://api.tecsoqr.com/v1/templates', {
  headers: {
    'Authorization': 'Bearer your-api-key'
  }
});`,
    },
    {
      method: "POST",
      endpoint: "/api/v1/batch",
      description: "Generate multiple QR codes in a single request",
      example: `fetch('https://api.tecsoqr.com/v1/batch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    codes: [
      { type: 'url', content: 'https://example1.com' },
      { type: 'text', content: 'Hello World' },
      { type: 'email', content: 'contact@example.com' }
    ]
  })
});`,
    },
    {
      method: "GET",
      endpoint: "/api/v1/analytics",
      description: "Get usage analytics and statistics for your API key",
      example: `fetch('https://api.tecsoqr.com/v1/analytics?period=30d', {
  headers: {
    'Authorization': 'Bearer your-api-key'
  }
});`,
    },
  ];

  const responseExample = `{
  "success": true,
  "data": {
    "id": "qr_1234567890",
    "qrCodeUrl": "https://cdn.tecsoqr.com/qr/1234567890.png",
    "qrCodeSvg": "<svg>...</svg>",
    "downloadUrl": "https://api.tecsoqr.com/download/1234567890",
    "metadata": {
      "size": 512,
      "format": "png",
      "created_at": "2025-09-25T20:30:00Z"
    }
  },
  "usage": {
    "requests_remaining": 9999,
    "reset_date": "2025-10-01T00:00:00Z"
  }
}`;

  const errorExample = `{
  "success": false,
  "error": {
    "code": "INVALID_CONTENT",
    "message": "The provided content is not valid for the specified QR type",
    "details": {
      "field": "content",
      "expected": "valid URL format",
      "received": "invalid-url"
    }
  }
}`;

  return (
    <Box bg={bg} minH="100vh" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          {/* Header */}
          <VStack spacing={6} textAlign="center" maxW="4xl">
            <Badge
              colorScheme={neon ? "pink" : "brand"}
              variant={neon ? "solid" : "outline"}
              fontSize="md"
              px={4}
              py={2}
              borderRadius="full"
            >
              <HStack spacing={2}>
                <FaCode />
                <Text>API Documentation</Text>
              </HStack>
            </Badge>

            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              fontWeight="black"
              bgGradient={
                neon
                  ? "linear(to-r, neon.pink, neon.cyan, neon.purple)"
                  : "linear(to-r, brand.500, brand.600)"
              }
              bgClip="text"
              layerStyle={neon ? "neonText" : undefined}
            >
              TECSOQR API
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              lineHeight="tall"
              maxW="3xl"
            >
              Integrate QR code generation into your applications with our
              powerful, easy-to-use REST API. Generate, customize, and manage QR
              codes programmatically.
            </Text>
          </VStack>

          {/* Quick Start */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody p={8}>
              <VStack spacing={6} align="start">
                <HStack>
                  <FaRocket color={neon ? "#ff36d2" : "#3182ce"} />
                  <Heading size="lg" layerStyle={neon ? "neonText" : undefined}>
                    Quick Start
                  </Heading>
                </HStack>
                <Text color={textColor}>
                  Get started with the TECSOQR API in minutes. Here's a complete
                  example:
                </Text>
                <CodeBlock language="javascript">{quickStartExample}</CodeBlock>
                <Alert status="info" variant="left-accent">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Free Tier Available!</AlertTitle>
                    <AlertDescription>
                      Start with 1,000 free QR code generations per month. No
                      credit card required.
                    </AlertDescription>
                  </Box>
                </Alert>
              </VStack>
            </CardBody>
          </Card>

          {/* API Endpoints */}
          <VStack spacing={8} w="full">
            <VStack spacing={4} textAlign="center">
              <Heading
                as="h2"
                size="xl"
                layerStyle={neon ? "neonText" : undefined}
              >
                API Endpoints
              </Heading>
              <Text color={textColor} fontSize="lg" maxW="2xl">
                Complete reference for all available API endpoints and their
                usage.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} w="full">
              {endpoints.map((endpoint, index) => (
                <EndpointCard key={index} {...endpoint} />
              ))}
            </SimpleGrid>
          </VStack>

          {/* Authentication */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody p={8}>
              <VStack spacing={6} align="start">
                <HStack>
                  <FaKey color={neon ? "#1de5ff" : "#3182ce"} />
                  <Heading size="lg" layerStyle={neon ? "neonText" : undefined}>
                    Authentication
                  </Heading>
                </HStack>

                <Text color={textColor}>
                  All API requests require authentication using an API key.
                  Include your API key in the Authorization header:
                </Text>

                <CodeBlock language="bash">
                  {`curl -H "Authorization: Bearer your-api-key" \\
     -H "Content-Type: application/json" \\
     https://api.tecsoqr.com/v1/generate`}
                </CodeBlock>

                <Alert status="warning" variant="left-accent">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Keep Your API Key Secret!</AlertTitle>
                    <AlertDescription>
                      Never expose your API key in client-side code. Use
                      environment variables or secure storage.
                    </AlertDescription>
                  </Box>
                </Alert>
              </VStack>
            </CardBody>
          </Card>

          {/* Response Examples */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody p={8}>
              <Tabs variant="enclosed" colorScheme={neon ? "pink" : "brand"}>
                <TabList>
                  <Tab>Success Response</Tab>
                  <Tab>Error Response</Tab>
                  <Tab>Rate Limits</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <VStack spacing={4} align="start">
                      <Text color={textColor}>
                        Successful API responses include the generated QR code
                        data and usage information:
                      </Text>
                      <CodeBlock language="json">{responseExample}</CodeBlock>
                    </VStack>
                  </TabPanel>

                  <TabPanel px={0}>
                    <VStack spacing={4} align="start">
                      <Text color={textColor}>
                        Error responses provide detailed information about what
                        went wrong:
                      </Text>
                      <CodeBlock language="json">{errorExample}</CodeBlock>
                    </VStack>
                  </TabPanel>

                  <TabPanel px={0}>
                    <VStack spacing={4} align="start">
                      <Text color={textColor}>
                        API rate limits help ensure fair usage and system
                        stability:
                      </Text>
                      <TableContainer>
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>Plan</Th>
                              <Th>Requests/Month</Th>
                              <Th>Rate Limit</Th>
                              <Th>Burst Limit</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td fontWeight="semibold">Free</Td>
                              <Td>1,000</Td>
                              <Td>10/minute</Td>
                              <Td>20</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="semibold">Pro</Td>
                              <Td>50,000</Td>
                              <Td>100/minute</Td>
                              <Td>200</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="semibold">Enterprise</Td>
                              <Td>Unlimited</Td>
                              <Td>1000/minute</Td>
                              <Td>2000</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>

          {/* SDKs and Tools */}
          <VStack spacing={8} w="full">
            <VStack spacing={4} textAlign="center">
              <Heading
                as="h2"
                size="xl"
                layerStyle={neon ? "neonText" : undefined}
              >
                SDKs & Tools
              </Heading>
              <Text color={textColor} fontSize="lg" maxW="2xl">
                Official SDKs and tools to help you integrate TECSOQR into your
                stack.
              </Text>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={6}
              w="full"
            >
              {[
                {
                  name: "JavaScript/Node.js",
                  status: "Available",
                  color: "green",
                },
                { name: "Python", status: "Available", color: "green" },
                { name: "PHP", status: "Coming Soon", color: "orange" },
                { name: "Go", status: "Coming Soon", color: "orange" },
              ].map((sdk, index) => (
                <Card key={index} variant={neon ? "neon" : undefined}>
                  <CardBody textAlign="center" p={6}>
                    <VStack spacing={3}>
                      <FaCode
                        size="2rem"
                        color={neon ? "#805dff" : "#3182ce"}
                      />
                      <Heading size="md">{sdk.name}</Heading>
                      <Badge colorScheme={sdk.color} variant="solid">
                        {sdk.status}
                      </Badge>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Support Section */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody textAlign="center" p={12}>
              <VStack spacing={6}>
                <FaShieldAlt size="3rem" color={neon ? "#3dff8a" : "#38a169"} />
                <Heading size="lg" layerStyle={neon ? "neonText" : undefined}>
                  Need Help?
                </Heading>
                <Text color={textColor} fontSize="lg" maxW="2xl">
                  Our developer support team is here to help you get the most
                  out of the TECSOQR API.
                </Text>
                <HStack spacing={4}>
                  <Button
                    size="lg"
                    variant={neon ? "neon" : "solid"}
                    leftIcon={<FaRocket />}
                  >
                    Get API Key
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor={neon ? "neon.cyan" : "brand.500"}
                    color={neon ? "neon.cyan" : "brand.500"}
                  >
                    Contact Support
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};
