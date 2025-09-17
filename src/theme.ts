import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2', // Primary blue color
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '1200px',
        px: { base: 4, md: 8 },
      },
    },
    Button: {
      variants: {
        solid: () => ({
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        }),
        outline: (props: any) => ({
          borderColor: 'brand.500',
          color: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.800' : 'brand.50',
          },
        }),
        ghost: (props: any) => ({
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.50',
          },
        }),
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Tabs: {
      variants: {
        'soft-rounded': (props: any) => ({
          tab: {
            borderRadius: 'full',
            fontWeight: 'semibold',
            color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
            _selected: {
              color: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
              bg: props.colorMode === 'dark' ? 'brand.800' : 'brand.50',
            },
            _hover: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50',
            },
          },
        }),
      },
    },
    Menu: {
      baseStyle: (props: any) => ({
        list: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        },
        item: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
        },
      }),
    },
  },
})

export default theme