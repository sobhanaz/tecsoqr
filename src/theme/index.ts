import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  styles: {
    global: (props: { colorMode: "light" | "dark" }) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.900",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
        borderRadius: "lg",
      },
      defaultProps: {
        colorScheme: "blue",
      },
      variants: {
        neon: {
          position: "relative",
          bg: "transparent",
          color: "neon.pink",
          _dark: { color: "neon.cyan" },
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          _before: {
            content: "''",
            position: "absolute",
            inset: 0,
            rounded: "lg",
            bg: "linear-gradient(90deg, var(--neon-cyan), var(--neon-pink))",
            filter: "blur(6px) brightness(1.2)",
            opacity: 0.8,
            zIndex: -1,
            transition: "all 0.3s ease",
          },
          _hover: {
            _before: { filter: "blur(10px) brightness(1.5)", opacity: 1 },
            transform: "translateY(-2px)",
          },
          _active: { transform: "translateY(0)" },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "white",
          _dark: {
            bg: "gray.800",
          },
          borderRadius: "xl",
          boxShadow: "lg",
          overflow: "hidden",
        },
      },
      variants: {
        neon: {
          container: {
            position: "relative",
            bg: "rgba(15,15,30,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid",
            borderColor: "rgba(255,255,255,0.08)",
            _before: {
              content: "''",
              position: "absolute",
              inset: 0,
              rounded: "inherit",
              padding: "1px",
              bg: "linear-gradient(125deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink))",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              opacity: 0.7,
              pointerEvents: "none",
            },
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.05), 0 0 25px -5px var(--neon-pink), 0 0 35px -10px var(--neon-cyan)",
            _dark: { bg: "rgba(10,10,18,0.85)" },
          },
        },
      },
    },
    Form: {
      baseStyle: {
        helperText: {
          color: "gray.600",
          _dark: {
            color: "gray.400",
          },
        },
      },
    },
  },
  colors: {
    brand: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    neon: {
      pink: "#ff36d2",
      cyan: "#1de5ff",
      purple: "#805dff",
      yellow: "#fff951",
      green: "#3dff8a",
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  shadows: {
    outline: "0 0 0 3px var(--chakra-colors-neon-pink)",
    neon: "0 0 8px var(--neon-cyan), 0 0 16px var(--neon-pink)",
  },
  layerStyles: {
    neonText: {
      color: "neon.pink",
      textShadow:
        "0 0 4px var(--neon-pink), 0 0 8px var(--neon-pink), 0 0 16px var(--neon-cyan)",
      _dark: {
        color: "neon.cyan",
        textShadow:
          "0 0 4px var(--neon-cyan), 0 0 10px var(--neon-cyan), 0 0 18px var(--neon-pink)",
      },
    },
  },
});

// Inject CSS variables for neon gradients (usable in pseudo-elements)
// These are global because some gradients are hard-coded in component variants
export const globalNeonStyles = `:root { --neon-pink:#ff36d2; --neon-cyan:#1de5ff; --neon-purple:#805dff; --neon-yellow:#fff951; --neon-green:#3dff8a; }`;
