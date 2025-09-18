# Getting Started with TECSOQR

This guide will help you set up and run TECSOQR on your local machine.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sobhanaz/tecsoqr.git
cd tecsoqr
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_APP_TITLE=TecsoQR
VITE_APP_DESCRIPTION=Modern QR Code Generator
VITE_APP_URL=http://localhost:5173
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:5173
```

## Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint for code quality

## Project Structure

```
tecsoqr/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── qr-forms/       # QR code input forms
│   │   ├── qr-preview/     # QR code preview
│   │   └── qr-customize/   # Style customization
│   ├── services/           # Business logic and API
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── theme/             # Chakra UI theme
├── public/                # Static assets
└── vite.config.ts        # Vite configuration
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=TecsoQR
VITE_APP_DESCRIPTION=Modern QR Code Generator
VITE_APP_URL=your-deployment-url
```

### VSCode Setup

Recommended extensions are specified in `.vscode/extensions.json`:

- ESLint
- Prettier
- Auto Rename Tag
- ES7+ React/Redux/React-Native snippets
- Path Intellisense
- Tailwind CSS IntelliSense
- Turbo Console Log

## Next Steps

- Check out the [Features](Features) documentation
- Learn about the [Technical Architecture](Technical-Architecture)
- Read the [Development Guide](Development-Guide)
- Understand the [API Reference](API-Reference)
