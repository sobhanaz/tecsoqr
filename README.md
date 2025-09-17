# TECSOQR - Custom QR Code Generator

<div align="center">

![TECSO Team](https://img.shields.io/badge/By-TECSO%20Team-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite)

A professional, feature-rich QR code generator built with modern web technologies. Create beautiful, customizable QR codes for your business and personal needs.

[Live Demo](https://qrcode.tecso.team/) | [TECSO Team](https://cv.tecso.team/)

</div>

## ✨ Features

- **Custom Content Types**: URLs, text, contact information, WiFi credentials
- **Advanced Styling**: Custom colors, gradients, and design options
- **Logo Integration**: Add your company logo to QR codes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **High Quality**: Adjustable error correction levels for optimal scanning
- **Export Options**: Download QR codes as PNG, SVG, or share directly
- **PWA Support**: Install as a progressive web app for offline access

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sobhanaz/tecsoqr.git
cd tecsoqr

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **UI Library**: Chakra UI with custom theme
- **QR Generation**: qrcode.react library
- **Icons**: React Icons
- **Image Export**: html-to-image
- **PWA**: Vite PWA plugin

## 📦 Project Structure

```
tecsoqr/
├── src/
│   ├── components/          # React components
│   │   ├── ContentTabs.tsx # Tab navigation
│   │   ├── QRForm.tsx      # QR customization form
│   │   ├── QRPreview.tsx   # QR code preview
│   │   └── Navbar.tsx      # Navigation header
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── theme.ts           # Chakra UI theme configuration
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## 🎨 Customization

The application uses Chakra UI with a custom theme. To modify the styling:

1. Edit `src/theme.ts` for theme customization
2. Modify `src/index.css` for global styles
3. Update component-specific styles in individual component files

## 📱 PWA Features

This application is a Progressive Web App (PWA) with:
- Offline functionality
- Install to home screen
- Automatic updates
- Manifest file for app-like experience

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

```bash
npm run build
# Deploys to https://sobhanaz.github.io/tecsoqr/
```

### Cloudflare Pages

For deployment to Cloudflare Pages:

```bash
npm run build
# Deploy dist folder to Cloudflare Pages
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests, create issues, or suggest new features.

### Development Guidelines

1. Follow TypeScript best practices
2. Use Chakra UI components for consistency
3. Maintain responsive design principles
4. Write meaningful commit messages
5. Test across different devices and browsers

## 📄 License

This project is developed and maintained by **TECSO Team** - an innovative IT company based in Iran, specializing in delivering cutting-edge smart technology solutions.

**TECSO Team** combines expertise in software development, cybersecurity, and user-centric design to address modern challenges. Our mission is to bridge technological gaps, enhance economic growth, and provide seamless, scalable solutions for local and international markets.

- 🌐 [TECSO Team Website](https://cv.tecso.team/)
- 📧 Contact: info@tecso.team

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [QR Code Best Practices](https://www.qrcode.com/en/howto/)

---

<div align="center">

**Built with ❤️ by TECSO Team**

*Empowering businesses through innovative technology solutions*

</div>
