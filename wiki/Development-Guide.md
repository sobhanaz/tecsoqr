# Development Guide

This guide provides detailed information for developers working on the TECSOQR project.

## Development Environment

### Required Tools

- Node.js 18+
- npm or yarn
- Git
- VS Code (recommended)

### VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "dsznajder.es7-react-js-snippets",
    "christian-kohler.path-intellisense",
    "bradlc.vscode-tailwindcss",
    "chakrounanas.turbo-console-log"
  ]
}
```

## Code Style Guide

### TypeScript Guidelines

1. Always use TypeScript types:

```typescript
interface QRCodeCustomization {
  foreground?: string;
  background?: string;
  cornerStyle?: "square" | "rounded" | "dots";
  dotStyle?: "square" | "rounded" | "dots";
}
```

2. Use proper type exports:

```typescript
export type QRCodeContent = QRCodeURL | QRCodeText | QRCodeEmail | QRCodePhone;
```

### React Component Guidelines

1. Functional Components:

```typescript
interface ComponentProps {
  value: QRCodeCustomization;
  onChange: (value: QRCodeCustomization) => void;
}

export const Component = ({ value, onChange }: ComponentProps) => {
  // Component logic
};
```

2. Props Interface Naming:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

### File Structure

```
src/
├── components/          # React components
│   ├── ComponentName/
│   │   ├── index.ts    # Export
│   │   └── ComponentName.tsx
│   └── shared/
├── services/           # Business logic
├── utils/             # Helper functions
└── types/             # Type definitions
```

## Adding New Features

### 1. Adding a New QR Code Type

1. Add type definition in `types/qr-code.ts`:

```typescript
export interface QRCodeNewType extends QRCodeBase {
  type: "newtype";
  field1: string;
  field2?: number;
}
```

2. Create form component in `components/qr-forms`:

```typescript
export const NewTypeForm = ({ value, onChange }: FormProps) => {
  // Form implementation
};
```

3. Add to QR code service in `services/qr-code.service.ts`:

```typescript
private static formatNewType(content: QRCodeNewType): string {
  // Format implementation
}
```

### 2. Adding New Styling Options

1. Update customization interface:

```typescript
interface QRCodeCustomization {
  newStyle?: "option1" | "option2";
}
```

2. Modify SVG modifier:

```typescript
const modifySvgStyles = (svg: string, customization?: QRCodeCustomization) => {
  // Add new style handling
};
```

## Testing

### Unit Testing

```typescript
describe("QRCodeService", () => {
  it("should generate valid QR code", async () => {
    // Test implementation
  });
});
```

### Component Testing

```typescript
describe("QRPreview", () => {
  it("should render preview correctly", () => {
    // Test implementation
  });
});
```

## Performance Optimization

### 1. Code Splitting

```typescript
const LazyComponent = lazy(() => import("./Component"));
```

### 2. Memoization

```typescript
const MemoizedComponent = memo(({ prop }: Props) => {
  // Component logic
});
```

### 3. useCallback for Functions

```typescript
const handleChange = useCallback(
  (newValue: string) => {
    // Handler logic
  },
  [dependencies]
);
```

## Error Handling

### 1. API Error Handling

```typescript
try {
  const qrCode = await QRCodeService.generateQRCode(content);
} catch (error) {
  console.error("QR generation failed:", error);
  // Handle error
}
```

### 2. Form Validation

```typescript
const validate = (input: QRCodeInput): ValidationResult => {
  // Validation logic
};
```

## Building for Production

### 1. Environment Setup

Create `.env.production`:

```env
VITE_APP_URL=https://qrcode.tecso.team
```

### 2. Build Command

```bash
npm run build
```

### 3. Production Optimization

- Enable source maps
- Configure cache headers
- Optimize assets

## Deployment

### GitHub Pages Deployment

```yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
```

## Contributing Guidelines

### 1. Branch Naming

- feature/feature-name
- fix/bug-description
- refactor/component-name

### 2. Commit Messages

```
feat: add new QR code type
fix: resolve style misalignment
refactor: improve performance
```

### 3. Pull Request Process

1. Create feature branch
2. Implement changes
3. Add tests
4. Submit PR with description

## Troubleshooting

### Common Issues

1. QR Code Generation Fails

```typescript
// Check content formatting
console.log("Content:", content);
// Verify SVG generation
console.log("SVG:", svg);
```

2. Style Issues

```typescript
// Debug style application
console.log("Applied styles:", customization);
// Check SVG structure
console.log("Modified SVG:", modifiedSvg);
```

### Debug Tools

- React Developer Tools
- VS Code Debugger
- Browser DevTools
