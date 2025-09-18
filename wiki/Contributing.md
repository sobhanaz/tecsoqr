# Contributing to TECSOQR

Thank you for your interest in contributing to TECSOQR! This guide will help you get started with contributing to the project.

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- A GitHub account

### Setup Process

1. Fork the repository

```bash
# Clone your fork
git clone https://github.com/your-username/tecsoqr.git

# Add upstream remote
git remote add upstream https://github.com/sobhanaz/tecsoqr.git

# Install dependencies
npm install
```

2. Create a new branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

## Development Workflow

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that don't affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

Example:

```
feat(qr-styles): add new dot style option

- Add circular dot style
- Implement size adjustment
- Update preview component

Closes #123
```

### Pull Request Process

1. Update documentation
2. Add tests if needed
3. Ensure CI passes
4. Request review from maintainers
5. Address review comments

## Testing Guidelines

### Unit Tests

```typescript
describe("QRCodeService", () => {
  it("should generate valid QR code", () => {
    // Test implementation
  });
});
```

### Component Tests

```typescript
describe("QRPreview", () => {
  it("should render correctly", () => {
    // Test implementation
  });
});
```

## Style Guide

### TypeScript Style

```typescript
// Use interfaces for object definitions
interface ComponentProps {
  value: string;
  onChange: (value: string) => void;
}

// Use type for unions/intersections
type ButtonVariant = "primary" | "secondary" | "ghost";

// Use const assertions
const SIZES = ["sm", "md", "lg"] as const;
type Size = (typeof SIZES)[number];
```

### React Components

```typescript
// Use functional components
const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Implementation
};

// Use proper prop types
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
}
```

## Documentation

### Code Documentation

```typescript
/**
 * Generates a QR code with custom styling
 * @param content - The content to encode
 * @param customization - Style options
 * @returns Promise<string> - The generated QR code
 */
async function generateQRCode(
  content: QRCodeContent,
  customization?: QRCodeCustomization
): Promise<string> {
  // Implementation
}
```

### Component Documentation

````typescript
/**
 * QRPreview Component
 *
 * Renders a preview of the generated QR code with download options
 *
 * @example
 * ```tsx
 * <QRPreview
 *   content={qrContent}
 *   customization={styles}
 * />
 * ```
 */
export const QRPreview = ({ content, customization }: QRPreviewProps) => {
  // Implementation
};
````

## Review Process

### Code Review Checklist

1. Code Quality

- [ ] Follows TypeScript best practices
- [ ] Uses proper types and interfaces
- [ ] Implements error handling
- [ ] Has necessary tests

2. Performance

- [ ] Optimized imports
- [ ] Proper memoization
- [ ] No unnecessary re-renders

3. Documentation

- [ ] Updated relevant docs
- [ ] Added inline comments
- [ ] Updated examples if needed

4. Testing

- [ ] Unit tests added/updated
- [ ] Component tests updated
- [ ] All tests passing

### Review Comments

- Be specific and constructive
- Explain the reasoning
- Provide examples when possible
- Use a friendly tone

## Release Process

### Version Numbering

We follow Semantic Versioning:

- MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Release Steps

1. Update version

```bash
npm version [major|minor|patch]
```

2. Update changelog

```markdown
## [1.1.0] - 2025-09-18

### Added

- New feature X
- Support for Y

### Fixed

- Bug in Z
```

3. Create release PR
4. Merge and tag release
5. Deploy to production

## Support

### Getting Help

- GitHub Issues: Technical problems and bugs
- Discussions: Questions and ideas
- Email: info@tecso.team for private inquiries

### Issue Templates

#### Bug Report

```markdown
**Description**
A clear description of the bug

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Environment**

- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]
```

#### Feature Request

```markdown
**Problem**
Description of the problem this feature would solve

**Solution**
Description of the proposed solution

**Alternatives**
Any alternative solutions considered
```
