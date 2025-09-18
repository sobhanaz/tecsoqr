# Technical Architecture

TECSOQR follows a modern, component-based architecture using React and TypeScript. Here's a detailed breakdown of the system:

## 1. Core Architecture

### Component Structure

```
src/
├── components/
│   ├── qr-forms/           # Input forms for different QR types
│   ├── qr-preview/         # QR code preview and download
│   ├── qr-customize/       # Style customization components
│   └── ui/                 # Shared UI components
├── services/
│   └── qr-code.service.ts  # Core QR generation logic
├── utils/
│   └── svg-modifier.ts     # SVG manipulation utilities
├── types/
│   └── qr-code.ts         # TypeScript type definitions
└── theme/
    └── index.ts           # Chakra UI theme configuration
```

## 2. Key Components

### QR Code Service (`QRCodeService`)

- Handles QR code generation
- Supports multiple content types
- Manages error correction
- Handles content formatting

```typescript
export class QRCodeService {
  public static async generateQRCode(
    content: QRCodeContent,
    customization?: QRCodeCustomization,
    output: QRCodeOutput
  ): Promise<string>;
}
```

### SVG Modifier (`svg-modifier.ts`)

- Manages QR code styling
- Handles corner and dot customization
- Maintains proper spacing and alignment
- Ensures scannable output

```typescript
const modifySvgStyles = (
  svg: string,
  customization?: {
    cornerStyle?: "square" | "rounded" | "dots";
    dotStyle?: "square" | "rounded" | "dots";
  }
) => { ... }
```

## 3. Data Flow

### Content Generation Flow

1. User input collection (`QRForm`)
2. Content validation and formatting
3. QR code generation (`QRCodeService`)
4. Style application (`svg-modifier`)
5. Preview rendering (`QRPreview`)

### Style Customization Flow

1. Style selection (`QRCustomization`)
2. Real-time preview updates
3. SVG modification
4. Final output generation

## 4. Type System

### Core Types

```typescript
type QRCodeType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "vcard"
  | "mecard"
  | "location"
  | "wifi"
  | "event"
  | "bitcoin"
  | "facebook"
  | "twitter"
  | "youtube";

interface QRCodeCustomization {
  foreground?: string;
  background?: string;
  cornerStyle?: "square" | "rounded" | "dots";
  dotStyle?: "square" | "rounded" | "dots";
}
```

## 5. Build System

### Vite Configuration

```typescript
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/logo.svg'],
      manifest: { ... }
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  }
})
```

## 6. Performance Optimizations

### Code Splitting

- Dynamic imports for forms
- Lazy loading of components
- Route-based splitting

### Caching Strategy

- PWA asset caching
- Runtime caching for fonts
- Service worker updates

### SVG Optimization

- Efficient path generation
- Minimal attribute updates
- Proper viewBox handling

## 7. Error Handling

### Error Boundary

```typescript
export class ErrorBoundary extends Component<Props, State> {
  public static getDerivedStateFromError(error: Error): State;
  public componentDidCatch(error: Error, errorInfo: ErrorInfo);
}
```

### Input Validation

- Type-specific validation
- Real-time feedback
- Error message handling

## 8. Theming System

### Chakra UI Theme

```typescript
const theme = extendTheme({
  colors: {
    brand: { ... },
  },
  components: {
    Button: { ... },
    Card: { ... },
    Form: { ... }
  }
})
```

## 9. Testing Strategy

### Unit Testing

- Component testing
- Service testing
- Utility function testing

### Integration Testing

- Form submission flows
- Style customization
- Export functionality

## 10. Security Measures

### Input Sanitization

- URL validation
- Content escaping
- XSS prevention

### File Handling

- Safe file uploads
- Type checking
- Size limitations
