# API Reference

This document provides detailed information about TECSOQR's API structure and usage.

## QR Code Service

### QRCodeService Class

Primary service for QR code generation and manipulation.

```typescript
class QRCodeService {
  static async generateQRCode(
    content: QRCodeContent,
    customization?: QRCodeCustomization,
    output: QRCodeOutput = {
      format: "svg",
      size: 1000,
      margin: 4,
      errorCorrectionLevel: "M",
    }
  ): Promise<string>;
}
```

#### Parameters

- `content`: QR code content (various types supported)
- `customization`: Style customization options
- `output`: Output format configuration

#### Content Types

```typescript
type QRCodeContent =
  | QRCodeURL
  | QRCodeText
  | QRCodeEmail
  | QRCodePhone
  | QRCodeSMS
  | QRCodeVCard
  | QRCodeMeCard
  | QRCodeLocation
  | QRCodeWiFi
  | QRCodeEvent
  | QRCodeBitcoin
  | QRCodeSocial;
```

#### URL Type

```typescript
interface QRCodeURL {
  type: "url";
  url: string;
}
```

#### Text Type

```typescript
interface QRCodeText {
  type: "text";
  text: string;
}
```

#### Email Type

```typescript
interface QRCodeEmail {
  type: "email";
  email: string;
  subject?: string;
  body?: string;
}
```

#### WiFi Type

```typescript
interface QRCodeWiFi {
  type: "wifi";
  ssid: string;
  password?: string;
  encryption: "WEP" | "WPA" | "nopass";
  hidden?: boolean;
}
```

#### VCard Type

```typescript
interface QRCodeVCard {
  type: "vcard";
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  workPhone?: string;
  homePhone?: string;
  mobilePhone?: string;
  email?: string;
  website?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}
```

### Customization Options

```typescript
interface QRCodeCustomization {
  foreground?: string;
  background?: string;
  gradient?: {
    type: "linear" | "radial";
    colorStops: Array<{ offset: number; color: string }>;
  };
  logo?: {
    file: File;
    size?: number; // 1-30
  };
  cornerStyle?: "square" | "rounded" | "dots";
  dotStyle?: "square" | "rounded" | "dots";
}
```

### Output Options

```typescript
interface QRCodeOutput {
  format: "png" | "svg" | "pdf" | "eps";
  size: number;
  margin: number;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
}
```

## SVG Modifier

### Function Signature

```typescript
const modifySvgStyles = (
  svg: string,
  customization?: {
    cornerStyle?: "square" | "rounded" | "dots";
    dotStyle?: "square" | "rounded" | "dots";
  }
) => string;
```

#### Parameters

- `svg`: Input SVG string
- `customization`: Style customization options

#### Returns

Modified SVG string with applied styles

## React Components

### QRPreview Component

```typescript
interface QRPreviewProps {
  content: QRCodeContent;
  customization?: QRCodeCustomization;
}

export const QRPreview: React.FC<QRPreviewProps>;
```

### QRCustomization Component

```typescript
interface QRCustomizationProps {
  value: QRCodeCustomization;
  onChange: (value: QRCodeCustomization) => void;
}

export const QRCustomization: React.FC<QRCustomizationProps>;
```

### Form Components

```typescript
interface FormProps<T extends QRCodeContent> {
  value: T;
  onChange: (value: T) => void;
}

export const URLForm: React.FC<FormProps<QRCodeURL>>;
export const TextForm: React.FC<FormProps<QRCodeText>>;
export const WiFiForm: React.FC<FormProps<QRCodeWiFi>>;
export const VCardForm: React.FC<FormProps<QRCodeVCard>>;
export const EmailForm: React.FC<FormProps<QRCodeEmail>>;
```

## Usage Examples

### Generate URL QR Code

```typescript
const content: QRCodeURL = {
  type: "url",
  url: "https://example.com",
};

const customization: QRCodeCustomization = {
  cornerStyle: "rounded",
  dotStyle: "dots",
  foreground: "#000000",
  background: "#FFFFFF",
};

const qrCode = await QRCodeService.generateQRCode(content, customization);
```

### Generate WiFi QR Code

```typescript
const content: QRCodeWiFi = {
  type: "wifi",
  ssid: "MyNetwork",
  password: "password123",
  encryption: "WPA",
  hidden: false,
};

const qrCode = await QRCodeService.generateQRCode(content);
```

### Generate vCard QR Code

```typescript
const content: QRCodeVCard = {
  type: "vcard",
  firstName: "John",
  lastName: "Doe",
  organization: "TECSO",
  title: "Developer",
  email: "john@example.com",
  workPhone: "+1234567890",
};

const qrCode = await QRCodeService.generateQRCode(content);
```

## Error Handling

### Error Types

```typescript
type QRCodeError =
  | "INVALID_CONTENT"
  | "GENERATION_FAILED"
  | "INVALID_STYLE"
  | "SVG_MODIFICATION_FAILED";

class QRCodeGenerationError extends Error {
  constructor(message: string, public type: QRCodeError);
}
```

### Error Handling Example

```typescript
try {
  const qrCode = await QRCodeService.generateQRCode(content);
} catch (error) {
  if (error instanceof QRCodeGenerationError) {
    switch (error.type) {
      case "INVALID_CONTENT":
        // Handle invalid content
        break;
      case "GENERATION_FAILED":
        // Handle generation failure
        break;
      // Handle other cases
    }
  }
}
```
