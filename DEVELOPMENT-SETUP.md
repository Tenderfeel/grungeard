# Development Setup Guide

**Updated:** December 15, 2024  
**Framework Versions:** React 19.2.3, Next.js 16.0.10, Material-UI 7.3.6

## Prerequisites

### System Requirements

- **Node.js**: 18.17.0 or higher (recommended: 20.x LTS)
- **npm**: 9.0.0 or higher (comes with Node.js)
- **Git**: For version control and submodule management
- **Operating System**: macOS, Linux, or Windows with WSL2

### Recommended Tools

- **VS Code**: With TypeScript, ESLint, and Prettier extensions
- **Chrome DevTools**: For debugging and performance analysis
- **Firebase CLI**: For deployment (optional)

## Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd grungeard-net
```

### 2. Initialize Submodules

The project uses a git submodule for game data:

```bash
git submodule update --init --recursive
```

### 3. Install Dependencies

```bash
npm install
```

This will install all dependencies and automatically run the postinstall script to update submodules.

### 4. Verify Installation

Check that key packages are installed correctly:

```bash
npm list react react-dom next @mui/material typescript
```

Expected output:

```
├── @mui/material@7.3.6
├── next@16.0.10
├── react@19.2.3
├── react-dom@19.2.3
└── typescript@5.9.3
```

## Development Workflow

### Starting Development Server

```bash
npm run dev
```

This starts the Next.js development server with Turbopack enabled:

- **URL**: http://localhost:3000
- **Hot Reloading**: Automatic page refresh on file changes
- **Fast Refresh**: Preserves component state during updates
- **Enhanced Performance**: Turbopack provides faster builds than Webpack

### New Features in Next.js 16.0.10

#### Enhanced Turbopack Performance

- **Faster Cold Starts**: ~40% improvement in initial build time
- **Improved Hot Reloading**: Near-instantaneous updates
- **Better Memory Management**: Reduced memory usage during development
- **Enhanced Error Reporting**: More detailed error messages and stack traces

#### React 19.2.3 Benefits

- **Improved Concurrent Features**: Better performance for complex UIs
- **Enhanced Error Boundaries**: More robust error handling
- **Optimized Hydration**: Faster initial page loads
- **Better TypeScript Integration**: Improved type inference and checking

#### Material-UI 7.3.6 Improvements

- **Performance Optimizations**: Faster component rendering
- **Enhanced Tree Shaking**: Smaller bundle sizes
- **Improved TypeScript Support**: Better type definitions
- **New Theme Features**: Enhanced customization options

### Code Quality Checks

#### TypeScript Compilation

```bash
npx tsc --noEmit
```

Benefits of TypeScript 5.9.3:

- **Improved Type Inference**: Better automatic type detection
- **Enhanced Error Messages**: More helpful compilation errors
- **Faster Compilation**: Performance improvements
- **New Language Features**: Latest ECMAScript support

#### ESLint Validation

```bash
npm run lint
```

The project uses ESLint 9.0 with:

- **Next.js Rules**: Optimized for Next.js best practices
- **TypeScript Integration**: Type-aware linting rules
- **React Hooks Rules**: Ensures proper hook usage
- **Accessibility Rules**: WCAG compliance checking

### Building for Production

```bash
npm run build
```

Production build features:

- **Turbopack Optimization**: Faster build times
- **Automatic Code Splitting**: Optimized bundle sizes
- **Static Optimization**: Pre-rendered pages where possible
- **Image Optimization**: Automatic image compression and format selection

## Project Architecture

### Directory Structure

```
src/
├── app/[lang]/              # Next.js App Router with i18n
│   ├── layout.tsx          # Root layout with MUI theme
│   ├── page.tsx            # Home page
│   ├── team-builder/       # Team optimization feature
│   └── randomizer/         # Character randomizer
├── components/             # Reusable UI components
│   ├── Character/          # Character-related components
│   ├── Filter/            # Filtering interfaces
│   ├── ResourceSelector/  # Selection components
│   └── Site/              # Global site components
├── data/                  # Static game data
├── stores/                # State management (Jotai)
└── @types/                # TypeScript type definitions

public/
└── assets/images/         # Game assets (characters, weapons, etc.)

submodule/zzz-wiki-scrap/  # External data source
```

### Key Architectural Patterns

#### App Router (Next.js 16.0.10)

- **File-based Routing**: Automatic route generation
- **Layout System**: Nested layouts with shared components
- **Server Components**: Default server-side rendering
- **Streaming**: Progressive page loading

#### Internationalization

- **Dynamic Routes**: `[lang]` parameter for locale handling
- **Middleware**: Automatic locale detection and redirection
- **Content Structure**: `{ ja: "日本語", en: "English" }` pattern
- **Type Safety**: TypeScript interfaces for multilingual content

#### State Management

- **Jotai**: Atomic state management for React
- **Local Storage**: Persistent user preferences
- **Theme State**: Material-UI theme switching
- **Component State**: React hooks for local state

## Development Best Practices

### TypeScript Guidelines

```typescript
// ✅ Good: Proper interface definition
interface CharacterListProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  selectedIds: string[];
}

// ✅ Good: Functional component with proper typing
const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onSelect,
  selectedIds,
}) => {
  // Component implementation
};

// ❌ Avoid: Using 'any' type
const handleData = (data: any) => {
  /* ... */
};

// ❌ Avoid: Missing prop interfaces
const MyComponent = ({ data, callback }) => {
  /* ... */
};
```

### Styling Guidelines

```typescript
// ✅ Good: Using MUI sx prop
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    bgcolor: 'background.paper',
    borderRadius: 1
  }}
>

// ✅ Good: Using styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

// ❌ Avoid: Inline styles
<div style={{ padding: '16px', margin: '8px' }}>

// ❌ Avoid: External CSS files
import './component.css';
```

### Performance Optimization

#### Image Optimization

```typescript
// ✅ Good: Using Next.js Image component
import Image from 'next/image';

<Image
  src="/assets/images/characters/alice.png"
  alt="Alice character portrait"
  width={100}
  height={100}
  priority={isAboveFold}
/>

// ❌ Avoid: Regular img tags
<img src="/assets/images/characters/alice.png" alt="Alice" />
```

#### Code Splitting

```typescript
// ✅ Good: Dynamic imports for large components
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <CircularProgress />,
  ssr: false,
});

// ✅ Good: Route-level code splitting (automatic with App Router)
// Each page in app/ directory is automatically code-split
```

## Debugging and Development Tools

### Browser DevTools

#### React DevTools

- **Component Inspector**: Examine component props and state
- **Profiler**: Performance analysis and optimization
- **Concurrent Features**: Debug React 19 concurrent rendering

#### Next.js DevTools

- **Build Analysis**: Bundle size and optimization insights
- **Performance Metrics**: Core Web Vitals monitoring
- **Route Information**: App Router debugging

### VS Code Configuration

Recommended `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Environment Variables

Create `.env.local` for local development:

```bash
# Development settings
NEXT_PUBLIC_APP_ENV=development

# Firebase configuration (if using)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

#### TypeScript Errors

```bash
# Restart TypeScript server
npx tsc --noEmit
# In VS Code: Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### Submodule Issues

```bash
# Reset submodules
git submodule deinit --all
git submodule update --init --recursive
```

### Performance Issues

#### Slow Development Server

- Ensure you're using Turbopack (`npm run dev` includes `--turbopack`)
- Check for large files in the project directory
- Restart the development server periodically

#### Memory Issues

- Close unnecessary browser tabs
- Restart the development server if memory usage is high
- Use `npm run build` to check for memory leaks

## Deployment

### Firebase Hosting

1. **Install Firebase CLI**:

```bash
npm install -g firebase-tools
```

2. **Login and Initialize**:

```bash
firebase login
firebase init hosting
```

3. **Build and Deploy**:

```bash
npm run build
firebase deploy
```

### Vercel (Alternative)

```bash
npm install -g vercel
vercel --prod
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Build and Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
```

## Additional Resources

### Documentation Links

- [Next.js 16.0 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Material-UI 7.3 Documentation](https://mui.com/)
- [TypeScript 5.9 Documentation](https://www.typescriptlang.org/docs/)

### Community Resources

- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [React Community Discord](https://discord.gg/react)
- [Material-UI Community](https://mui.com/community/)

### Learning Resources

- [Next.js Learn Course](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

---

**Note**: This setup guide reflects the latest updates made in December 2024. For any issues or questions, refer to the troubleshooting section or consult the official documentation.
