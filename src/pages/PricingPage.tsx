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
  Icon,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  FaCheck,
  FaTimes,
  FaRocket,
  FaShieldAlt,
  FaHeadset,
  FaCloud,
  FaCode,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { useNeonMode } from "@/theme/useNeonMode";

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  isPopular,
  ctaText,
  ctaVariant = "solid",
  yearlyPrice,
  isYearly,
}: {
  title: string;
  price: string;
  period: string;
  description: string;
  features: Array<{ text: string; included: boolean }>;
  isPopular?: boolean;
  ctaText: string;
  ctaVariant?: string;
  yearlyPrice?: string;
  isYearly: boolean;
}) => {
  const { neon } = useNeonMode();
  const { setPlan } = useSubscription();
  const navigate = useNavigate();

  const displayPrice = isYearly && yearlyPrice ? yearlyPrice : price;
  const displayPeriod = isYearly ? "year" : period;

  return (
    <Card
      variant={neon ? "neon" : undefined}
      position="relative"
      h="full"
      transform={isPopular ? "scale(1.05)" : "scale(1)"}
      transition="all 0.2s"
      _hover={{ transform: isPopular ? "scale(1.07)" : "scale(1.02)" }}
    >
      {isPopular && (
        <Badge
          position="absolute"
          top={-3}
          left="50%"
          transform="translateX(-50%)"
          colorScheme={neon ? "pink" : "brand"}
          variant="solid"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="sm"
          boxShadow="lg"
        >
          <HStack spacing={1}>
            <FaStar size="0.8rem" />
            <Text>Most Popular</Text>
          </HStack>
        </Badge>
      )}

      <CardBody p={8}>
        <VStack spacing={6} align="stretch">
          <VStack spacing={3} textAlign="center">
            <Heading
              size="lg"
              color={neon ? "neon.cyan" : "brand.600"}
              layerStyle={neon ? "neonText" : undefined}
            >
              {title}
            </Heading>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="lg"
            >
              {description}
            </Text>
            <VStack spacing={1}>
              <HStack align="baseline" justify="center" spacing={1}>
                <Text
                  fontSize="4xl"
                  fontWeight="black"
                  color={neon ? "neon.pink" : "brand.500"}
                >
                  {displayPrice}
                </Text>
                <Text color={useColorModeValue("gray.600", "gray.400")}>
                  /{displayPeriod}
                </Text>
              </HStack>
              {isYearly && yearlyPrice && (
                <Text
                  fontSize="sm"
                  color="green.500"
                  textDecoration="line-through"
                >
                  Was ${parseInt(price.replace("$", "")) * 12}/year
                </Text>
              )}
            </VStack>
          </VStack>

          <VStack spacing={3} align="stretch">
            {features.map((feature, index) => (
              <HStack key={index} spacing={3}>
                <Icon
                  as={feature.included ? FaCheck : FaTimes}
                  color={
                    feature.included
                      ? neon
                        ? "neon.green"
                        : "green.500"
                      : "gray.400"
                  }
                  boxSize={4}
                />
                <Text
                  color={feature.included ? "inherit" : "gray.400"}
                  textDecoration={feature.included ? "none" : "line-through"}
                >
                  {feature.text}
                </Text>
              </HStack>
            ))}
          </VStack>

          <Button
            size="lg"
            variant={
              ctaVariant === "neon" ? "neon" : isPopular ? "solid" : "outline"
            }
            colorScheme={neon ? "pink" : "brand"}
            w="full"
            mt={4}
            onClick={() => {
              if (title === "Free") {
                setPlan("free");
                navigate("/");
              } else if (title === "Pro") {
                setPlan("pro");
                navigate("/bulk");
              } else {
                setPlan("enterprise");
                navigate("/contact");
              }
            }}
          >
            {ctaText}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export const PricingPage = () => {
  const { neon } = useNeonMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Free",
      price: "$0",
      yearlyPrice: "$0",
      period: "month",
      description: "Perfect for personal projects and getting started",
      features: [
        { text: "1,000 QR codes per month", included: true },
        { text: "Basic customization", included: true },
        { text: "PNG/SVG export", included: true },
        { text: "5 QR types (URL, Text, Email, etc.)", included: true },
        { text: "Community support", included: true },
        { text: "API access", included: false },
        { text: "Analytics dashboard", included: false },
        { text: "Priority support", included: false },
        { text: "Custom branding", included: false },
        { text: "Bulk generation", included: false },
      ],
      ctaText: "Get Started Free",
      ctaVariant: "outline",
    },
    {
      title: "Pro",
      price: "$19",
      yearlyPrice: "$190",
      period: "month",
      description: "For professionals and growing businesses",
      isPopular: true,
      features: [
        { text: "50,000 QR codes per month", included: true },
        { text: "Advanced customization", included: true },
        { text: "All export formats", included: true },
        { text: "All QR types + Custom", included: true },
        { text: "Priority email support", included: true },
        { text: "Full API access", included: true },
        { text: "Analytics dashboard", included: true },
        { text: "Custom branding", included: true },
        { text: "Bulk generation (100 at once)", included: true },
        { text: "Team collaboration", included: false },
      ],
      ctaText: "Start Pro Trial",
      ctaVariant: neon ? "neon" : "solid",
    },
    {
      title: "Enterprise",
      price: "$99",
      yearlyPrice: "$990",
      period: "month",
      description: "For large teams and enterprise solutions",
      features: [
        { text: "Unlimited QR codes", included: true },
        { text: "White-label solution", included: true },
        { text: "Custom integrations", included: true },
        { text: "All features included", included: true },
        { text: "24/7 phone & email support", included: true },
        { text: "Dedicated API endpoints", included: true },
        { text: "Advanced analytics & reporting", included: true },
        { text: "Custom branding everywhere", included: true },
        { text: "Unlimited bulk generation", included: true },
        { text: "Team collaboration & roles", included: true },
      ],
      ctaText: "Contact Sales",
      ctaVariant: "outline",
    },
  ];

  const features = [
    {
      icon: FaRocket,
      title: "Lightning Fast",
      description:
        "Generate QR codes in milliseconds with our optimized infrastructure",
    },
    {
      icon: FaShieldAlt,
      title: "Enterprise Security",
      description:
        "SOC 2 compliant with end-to-end encryption and privacy protection",
    },
    {
      icon: FaCloud,
      title: "99.9% Uptime",
      description: "Reliable service with global CDN and redundant systems",
    },
    {
      icon: FaCode,
      title: "Developer Friendly",
      description:
        "RESTful API, SDKs, webhooks, and comprehensive documentation",
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description:
        "Track scans, locations, devices, and user behavior insights",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "Expert support team available around the clock for enterprise customers",
    },
  ];

  return (
    <Box bg={bg} minH="100vh" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
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
              Pricing Plans
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
              Simple, Transparent Pricing
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              lineHeight="tall"
              maxW="3xl"
            >
              Choose the perfect plan for your needs. Start free and scale as
              you grow. All plans include our core QR generation features with
              no hidden fees.
            </Text>

            {/* Billing Toggle */}
            <Card variant={neon ? "neon" : undefined}>
              <CardBody>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FormLabel htmlFor="billing-toggle" mb="0" mr={4}>
                    Monthly
                  </FormLabel>
                  <Switch
                    id="billing-toggle"
                    colorScheme={neon ? "pink" : "brand"}
                    isChecked={isYearly}
                    onChange={(e) => setIsYearly(e.target.checked)}
                  />
                  <FormLabel htmlFor="billing-toggle" mb="0" ml={4}>
                    Yearly
                  </FormLabel>
                  <Badge ml={2} colorScheme="green" variant="solid">
                    Save 20%
                  </Badge>
                </FormControl>
              </CardBody>
            </Card>
          </VStack>

          {/* Pricing Cards */}
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="full">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} isYearly={isYearly} />
            ))}
          </SimpleGrid>

          {/* Features Grid */}
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
                Built for scale, designed for developers, trusted by businesses
                worldwide.
              </Text>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              w="full"
            >
              {features.map((feature, index) => (
                <Card key={index} variant={neon ? "neon" : undefined}>
                  <CardBody textAlign="center" p={6}>
                    <VStack spacing={4}>
                      <Box
                        p={3}
                        bg={neon ? "rgba(255,54,210,0.1)" : "brand.50"}
                        borderRadius="full"
                        color={neon ? "neon.pink" : "brand.500"}
                      >
                        <Icon as={feature.icon} boxSize={8} />
                      </Box>
                      <Heading
                        size="md"
                        color={neon ? "neon.cyan" : "brand.600"}
                      >
                        {feature.title}
                      </Heading>
                      <Text color={textColor} lineHeight="tall">
                        {feature.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>

          {/* FAQ Section */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody p={8}>
              <VStack spacing={6}>
                <Heading
                  size="lg"
                  textAlign="center"
                  layerStyle={neon ? "neonText" : undefined}
                >
                  Frequently Asked Questions
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Heading
                        size="sm"
                        mb={2}
                        color={neon ? "neon.cyan" : "brand.500"}
                      >
                        Can I change plans anytime?
                      </Heading>
                      <Text color={textColor} fontSize="sm">
                        Yes! You can upgrade or downgrade your plan at any time.
                        Changes take effect immediately, and we'll prorate any
                        billing differences.
                      </Text>
                    </Box>

                    <Box>
                      <Heading
                        size="sm"
                        mb={2}
                        color={neon ? "neon.cyan" : "brand.500"}
                      >
                        What happens if I exceed my limit?
                      </Heading>
                      <Text color={textColor} fontSize="sm">
                        We'll notify you before you reach your limit. You can
                        upgrade your plan or purchase additional credits to
                        continue generating QR codes.
                      </Text>
                    </Box>

                    <Box>
                      <Heading
                        size="sm"
                        mb={2}
                        color={neon ? "neon.cyan" : "brand.500"}
                      >
                        Do you offer custom enterprise solutions?
                      </Heading>
                      <Text color={textColor} fontSize="sm">
                        Absolutely! We work with enterprise customers to create
                        custom solutions, including white-label options and
                        dedicated infrastructure.
                      </Text>
                    </Box>
                  </VStack>

                  <VStack align="start" spacing={4}>
                    <Box>
                      <Heading
                        size="sm"
                        mb={2}
                        color={neon ? "neon.cyan" : "brand.500"}
                      >
                        Is there a free trial for paid plans?
                      </Heading>
                      <Text color={textColor} fontSize="sm">
                        Yes! Pro and Enterprise plans come with a 14-day free
                        trial. No credit card required to start your trial.
                      </Text>
                    </Box>

                    <Box>
                      <Heading
                        size="sm"
                        mb={2}
                        color={neon ? "neon.cyan" : "brand.500"}
                      >
                        What payment methods do you accept?
                      </Heading>
                      <Text color={textColor} fontSize="sm">
                        We accept all major credit cards, PayPal, and can
                        arrange invoicing for enterprise customers with annual
                        contracts.
                      </Text>
                    </Box>

                    <Box>
                      <Heading
                        size="sm"
                        mb={2}
                        color={neon ? "neon.cyan" : "brand.500"}
                      >
                        Can I cancel my subscription anytime?
                      </Heading>
                      <Text color={textColor} fontSize="sm">
                        Yes, you can cancel your subscription at any time.
                        You'll retain access to your paid features until the end
                        of your billing period.
                      </Text>
                    </Box>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>

          {/* CTA Section */}
          <Card variant={neon ? "neon" : undefined} w="full">
            <CardBody textAlign="center" p={12}>
              <VStack spacing={6}>
                <Icon
                  as={FaRocket}
                  boxSize={12}
                  color={neon ? "neon.pink" : "brand.500"}
                />
                <Heading size="lg" layerStyle={neon ? "neonText" : undefined}>
                  Ready to Get Started?
                </Heading>
                <Text color={textColor} fontSize="lg" maxW="2xl">
                  Join thousands of developers and businesses who trust TECSOQR
                  for their QR code needs. Start free and scale as you grow.
                </Text>
                <HStack spacing={4}>
                  <Button
                    size="lg"
                    variant={neon ? "neon" : "solid"}
                    leftIcon={<FaRocket />}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor={neon ? "neon.cyan" : "brand.500"}
                    color={neon ? "neon.cyan" : "brand.500"}
                  >
                    Contact Sales
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
