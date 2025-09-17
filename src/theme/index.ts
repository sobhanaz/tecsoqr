import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      defaultProps: {
        colorScheme: 'blue',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          _dark: {
            bg: 'gray.800',
          },
          borderRadius: 'xl',
          boxShadow: 'lg',
          overflow: 'hidden',
        },
      },
    },
    Form: {
      baseStyle: {
        helperText: {
          color: 'gray.600',
          _dark: {
            color: 'gray.400',
          },
        },
      },
    },
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});