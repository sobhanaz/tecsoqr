import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Card,
  CardBody,
  Image,
  Button,
  useColorModeValue,
  Badge,
  Icon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import {
  FaQrcode,
  FaShieldAlt,
  FaRocket,
  FaMobile,
  FaCloud,
  FaCode,
  FaPalette,
  FaHeart,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { useNeonMode } from "@/theme/useNeonMode";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  const { neon } = useNeonMode();
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Card variant={neon ? "neon" : undefined} bg={cardBg} h="full">
      <CardBody textAlign="center" p={6}>
        <VStack spacing={4}>
          <Box
            p={3}
            bg={neon ? "rgba(255,54,210,0.1)" : "brand.50"}
            borderRadius="full"
            color={neon ? "neon.pink" : "brand.500"}
          >
            <Icon as={icon} boxSize={8} />
          </Box>
          <Heading size="md" color={neon ? "neon.cyan" : "brand.600"}>
            {title}
          </Heading>
          <Text
            color={useColorModeValue("gray.600", "gray.400")}
            lineHeight="tall"
          >
            {description}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

const TeamMember = ({
  name,
  role,
  bio,
  avatar,
  social,
}: {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: { linkedin?: string; github?: string; twitter?: string };
}) => {
  const { neon } = useNeonMode();

  return (
    <Card variant={neon ? "neon" : undefined}>
      <CardBody textAlign="center" p={6}>
        <VStack spacing={4}>
          <Image
            src={avatar}
            alt={name}
            boxSize="120px"
            borderRadius="full"
            border="4px solid"
            borderColor={neon ? "neon.pink" : "brand.200"}
            fallbackSrc="https://via.placeholder.com/120/4A5568/FFFFFF?text=Team"
          />
          <VStack spacing={2}>
            <Heading size="md" layerStyle={neon ? "neonText" : undefined}>
              {name}
            </Heading>
            <Badge
              colorScheme={neon ? "pink" : "brand"}
              variant={neon ? "solid" : "subtle"}
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
            >
              {role}
            </Badge>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
              lineHeight="tall"
            >
              {bio}
            </Text>
          </VStack>
          <HStack spacing={3}>
            {social.linkedin && (
              <Button
                as="a"
                href={social.linkedin}
                target="_blank"
                variant="ghost"
                size="sm"
                leftIcon={<FaLinkedin />}
                color={neon ? "neon.cyan" : "brand.500"}
              >
                LinkedIn
              </Button>
            )}
            {social.github && (
              <Button
                as="a"
                href={social.github}
                target="_blank"
                variant="ghost"
                size="sm"
                leftIcon={<FaGithub />}
                color={neon ? "neon.cyan" : "brand.500"}
              >
                GitHub
              </Button>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export const AboutPage = () => {
  const { neon } = useNeonMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const stats = [
    {
      label: "QR Codes Generated",
      value: "50,000+",
      helpText: "And counting!",
    },
    { label: "Active Users", value: "5,000+", helpText: "Worldwide" },
    { label: "Countries Served", value: "120+", helpText: "Global reach" },
    { label: "Uptime", value: "99.9%", helpText: "Reliable service" },
  ];

  const features = [
    {
      icon: FaQrcode,
      title: "Multiple QR Types",
      description:
        "Generate QR codes for URLs, text, WiFi, vCards, emails, and more with advanced customization options.",
    },
    {
      icon: FaPalette,
      title: "Custom Styling",
      description:
        "Personalize your QR codes with custom colors, gradients, and logo integration for brand consistency.",
    },
    {
      icon: FaMobile,
      title: "Mobile Optimized",
      description:
        "Responsive design ensures perfect functionality across all devices and screen sizes.",
    },
    {
      icon: FaCloud,
      title: "Cloud Ready",
      description:
        "Progressive Web App technology enables offline usage and seamless cross-device synchronization.",
    },
    {
      icon: FaShieldAlt,
      title: "Privacy First",
      description:
        "All QR code generation happens client-side. No data is stored or transmitted to our servers.",
    },
    {
      icon: FaRocket,
      title: "Fast & Reliable",
      description:
        "Lightning-fast generation with optimized algorithms and modern web technologies.",
    },
  ];

  const teamMembers = [
    {
      name: "Sobhan Azarnia",
      role: "Lead Developer",
      bio: "Full-stack developer passionate about creating innovative web solutions and open-source technologies.",
      avatar: "/api/placeholder/120/120",
      social: {
        github: "https://github.com/sobhanaz",
        linkedin: "https://linkedin.com/in/sobhanaz",
      },
    },
    {
      name: "TECSO Team",
      role: "Development Team",
      bio: "A collaborative team of developers, designers, and innovators working together to build cutting-edge solutions.",
      avatar: "/api/placeholder/120/120",
      social: {
        github: "https://github.com/tecsodev",
        twitter: "https://twitter.com/tecsodev",
      },
    },
  ];

  return (
    <Box bg={bg} minH="100vh" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* Hero Section */}
          <VStack spacing={6} textAlign="center" maxW="4xl">
            <Badge
              colorScheme={neon ? "pink" : "brand"}
              variant={neon ? "solid" : "outline"}
              fontSize="md"
              px={4}
              py={2}
              borderRadius="full"
            >
              About TECSOQR
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
              Empowering Digital Connections
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              lineHeight="tall"
              maxW="3xl"
            >
              TECSOQR is more than just a QR code generator. We're building the
              future of digital connectivity with innovative tools that bridge
              the gap between physical and digital worlds. Our mission is to
              make QR technology accessible, beautiful, and powerful for
              everyone.
            </Text>
          </VStack>

          {/* Stats Section */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full">
            {stats.map((stat, index) => (
              <Card key={index} variant={neon ? "neon" : undefined}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatNumber
                      fontSize="3xl"
                      fontWeight="black"
                      color={neon ? "neon.pink" : "brand.500"}
                    >
                      {stat.value}
                    </StatNumber>
                    <StatLabel fontSize="md" fontWeight="semibold">
                      {stat.label}
                    </StatLabel>
                    <StatHelpText color={textColor}>
                      {stat.helpText}
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Features Section */}
          <VStack spacing={8} w="full">
            <VStack spacing={4} textAlign="center">
              <Heading
                as="h2"
                size="xl"
                layerStyle={neon ? "neonText" : undefined}
              >
                Why Choose TECSOQR?
              </Heading>
              <Text color={textColor} fontSize="lg" maxW="2xl">
                We've built TECSOQR with cutting-edge technology and user
                experience at the forefront.
              </Text>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              w="full"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </SimpleGrid>
          </VStack>

          {/* Technology Section */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody p={8}>
              <VStack spacing={6}>
                <Heading
                  size="lg"
                  textAlign="center"
                  layerStyle={neon ? "neonText" : undefined}
                >
                  Built with Modern Technology
                </Heading>
                <Grid
                  templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                  gap={8}
                  w="full"
                >
                  <VStack align="start" spacing={4}>
                    <Heading size="md" color={neon ? "neon.cyan" : "brand.500"}>
                      Frontend Technologies
                    </Heading>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Badge colorScheme="blue">React 19</Badge>
                        <Text>Modern component architecture</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="blue">TypeScript</Badge>
                        <Text>Type-safe development</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="teal">Chakra UI</Badge>
                        <Text>Accessible design system</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="purple">Vite</Badge>
                        <Text>Lightning-fast build tool</Text>
                      </HStack>
                    </VStack>
                  </VStack>

                  <VStack align="start" spacing={4}>
                    <Heading size="md" color={neon ? "neon.cyan" : "brand.500"}>
                      Key Features
                    </Heading>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Icon as={FaShieldAlt} color="green.500" />
                        <Text>Client-side processing</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaMobile} color="blue.500" />
                        <Text>Progressive Web App</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaCode} color="purple.500" />
                        <Text>Open source</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaPalette} color="pink.500" />
                        <Text>Customizable themes</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Grid>
              </VStack>
            </CardBody>
          </Card>

          {/* Team Section */}
          <VStack spacing={8} w="full">
            <VStack spacing={4} textAlign="center">
              <Heading
                as="h2"
                size="xl"
                layerStyle={neon ? "neonText" : undefined}
              >
                Meet the Team
              </Heading>
              <Text color={textColor} fontSize="lg" maxW="2xl">
                The passionate individuals behind TECSOQR, dedicated to creating
                exceptional digital experiences.
              </Text>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={8}
              w="full"
              maxW="4xl"
            >
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </SimpleGrid>
          </VStack>

          {/* CTA Section */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody textAlign="center" p={12}>
              <VStack spacing={6}>
                <Icon
                  as={FaHeart}
                  boxSize={12}
                  color={neon ? "neon.pink" : "red.500"}
                />
                <Heading size="lg" layerStyle={neon ? "neonText" : undefined}>
                  Ready to Create Amazing QR Codes?
                </Heading>
                <Text color={textColor} fontSize="lg" maxW="2xl">
                  Join thousands of users who trust TECSOQR for their QR code
                  needs. Start creating beautiful, functional QR codes today.
                </Text>
                <HStack spacing={4}>
                  <Button
                    size="lg"
                    variant={neon ? "neon" : "solid"}
                    leftIcon={<FaRocket />}
                    as="a"
                    href="/"
                  >
                    Start Creating
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    leftIcon={<FaGithub />}
                    as="a"
                    href="https://github.com/sobhanaz/tecsoqr"
                    target="_blank"
                    borderColor={neon ? "neon.cyan" : "brand.500"}
                    color={neon ? "neon.cyan" : "brand.500"}
                  >
                    View Source
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
