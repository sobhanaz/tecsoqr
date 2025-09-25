import { extendTheme, type StyleFunctionProps } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  colors: {
    brand: {
      50: "#E6F6FF",
      100: "#BAE3FF",
      200: "#7CC4FA",
      300: "#47A3F3",
      400: "#2186EB",
      500: "#0967D2", // Primary blue color
      600: "#0552B5",
      700: "#03449E",
      800: "#01337D",
      900: "#002159",
    },
    neon: {
      pink: "#ff36d2",
      cyan: "#1de5ff",
      purple: "#805dff",
      yellow: "#fff951",
      green: "#3dff8a",
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body, #root": {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "white" : "gray.800",
        transition: "background 0.4s ease",
      },
      "body.neon-active, .neon-active body": {
        background:
          "radial-gradient(circle at 20% 20%, rgba(255,54,210,0.18), transparent 60%), radial-gradient(circle at 80% 70%, rgba(29,229,255,0.15), transparent 65%), #05060A",
        color: "white",
      },
      ".neon-grid:before": {
        content: '""',
        position: "fixed",
        inset: 0,
        background:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 80px)",
        pointerEvents: "none",
        zIndex: -1,
      },
    }),
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "1200px",
        px: { base: 4, md: 8 },
      },
    },
    Button: {
      variants: {
        solid: () => ({
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        }),
        outline: (props: StyleFunctionProps) => ({
          borderColor: "brand.500",
          color: props.colorMode === "dark" ? "brand.200" : "brand.500",
          _hover: {
            bg: props.colorMode === "dark" ? "brand.800" : "brand.50",
          },
        }),
        ghost: (props: StyleFunctionProps) => ({
          _hover: {
            bg: props.colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.50",
          },
        }),
        neon: {
          position: "relative",
          bg: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "neon.pink",
          fontWeight: "semibold",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          boxShadow:
            "0 0 8px var(--chakra-colors-neon-pink), 0 0 14px var(--chakra-colors-neon-cyan)",
          _dark: { color: "neon.cyan" },
          _hover: {
            boxShadow:
              "0 0 10px var(--chakra-colors-neon-pink), 0 0 18px var(--chakra-colors-neon-cyan)",
            transform: "translateY(-2px)",
          },
          _active: { transform: "translateY(0)" },
        },
      },
      defaultProps: {
        colorScheme: "brand",
      },
    },
    Card: {
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
              bg: "linear-gradient(125deg, var(--chakra-colors-neon-cyan), var(--chakra-colors-neon-purple), var(--chakra-colors-neon-pink))",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              opacity: 0.6,
              pointerEvents: "none",
            },
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.05), 0 0 25px -5px var(--chakra-colors-neon-pink), 0 0 35px -10px var(--chakra-colors-neon-cyan)",
          },
        },
      },
    },
    Tabs: {
      variants: {
        "soft-rounded": (props: StyleFunctionProps) => ({
          tab: {
            borderRadius: "full",
            fontWeight: "semibold",
            color: props.colorMode === "dark" ? "gray.400" : "gray.600",
            _selected: {
              color: props.colorMode === "dark" ? "neon.cyan" : "neon.pink",
              bg:
                props.colorMode === "dark"
                  ? "rgba(128,93,255,0.25)"
                  : "rgba(255,54,210,0.15)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 0 6px var(--chakra-colors-neon-pink)",
            },
            _hover: {
              bg:
                props.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.50",
            },
          },
        }),
      },
    },
    Menu: {
      baseStyle: (props: StyleFunctionProps) => ({
        list: {
          bg: props.colorMode === "dark" ? "gray.800" : "white",
          borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
        },
        item: {
          bg: props.colorMode === "dark" ? "gray.800" : "white",
          _hover: {
            bg: props.colorMode === "dark" ? "gray.700" : "gray.100",
          },
        },
      }),
    },
  },
  shadows: {
    neon: "0 0 8px var(--chakra-colors-neon-cyan), 0 0 16px var(--chakra-colors-neon-pink)",
  },
  layerStyles: {
    neonText: {
      color: "neon.pink",
      textShadow:
        "0 0 4px var(--chakra-colors-neon-pink), 0 0 10px var(--chakra-colors-neon-pink), 0 0 18px var(--chakra-colors-neon-cyan)",
      _dark: {
        color: "neon.cyan",
        textShadow:
          "0 0 4px var(--chakra-colors-neon-cyan), 0 0 10px var(--chakra-colors-neon-cyan), 0 0 18px var(--chakra-colors-neon-pink)",
      },
    },
  },
});

// Global neon styles for CSS injection
export const globalNeonStyles = `
  :root {
    --neon-pink: #ff36d2;
    --neon-cyan: #1de5ff;
    --neon-purple: #805dff;
    --neon-yellow: #fff951;
    --neon-green: #3dff8a;
  }
  .neon-active {
    background: radial-gradient(circle at 20% 20%, rgba(255,54,210,0.12), transparent 60%), 
                radial-gradient(circle at 80% 70%, rgba(29,229,255,0.1), transparent 65%), 
                #0a0a0f !important;
  }
  .neon-grid::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 80px),
                repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 80px);
    pointer-events: none;
    z-index: -1;
  }
`;

export default theme;
