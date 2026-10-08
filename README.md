# Grungerad.net - Zenless Zone Zero Team Builder

A comprehensive team optimization and character management tool for Zenless Zone Zero players, built with the latest web technologies.

## Tech Stack

- **Next.js 16.0.10** with App Router and Turbopack
- **React 19.2.3** with TypeScript 5.9.3
- **Material-UI 7.3.6** for UI components
- **Firebase Hosting** for deployment
- **Internationalization** (Japanese/English support)

## Features

- **Team Builder**: Algorithm-based team composition optimization
- **Character Randomizer**: Random team generation with advanced filtering
- **Multilingual Support**: Full Japanese and English localization
- **Dark/Light Theme**: Material-UI theming with user preference persistence
- **Mobile Responsive**: Optimized for all device sizes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd grungeard-net
```

2. Install dependencies:

```bash
npm install
```

3. Initialize submodules (for game data):

```bash
git submodule update --init --recursive
```

### Development

Start the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The page auto-updates as you edit files thanks to Next.js hot reloading.

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint code quality checks
```

## Project Structure

```
src/
├── app/[lang]/          # Next.js App Router with i18n
│   ├── page.tsx         # Home page
│   ├── team-builder/    # Team optimization tool
│   └── randomizer/      # Character randomizer
├── components/          # Reusable UI components
├── data/               # Static game data
└── stores/             # State management

public/assets/images/    # Game assets (characters, weapons, etc.)
submodule/zzz-wiki-scrap/ # External data source
```

## Internationalization

The application supports Japanese (default) and English:

- Routes use `[lang]` dynamic segments: `/ja/team-builder`, `/en/team-builder`
- All content has both language versions
- Automatic locale detection based on browser preferences
- Manual language switching available in the UI

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Functional components with proper TypeScript interfaces
- **Styling**: Material-UI `sx` prop or `styled()` components only
- **File Naming**: PascalCase for components, camelCase for utilities

### Key Patterns

- Use Next.js Image component for all images
- Implement proper error boundaries and loading states
- Follow Material-UI theming for consistent styling
- Use path aliases: `@/*` maps to `./src/*`

## Game Data

Character, weapon, and enemy data is sourced from the `zzz-wiki-scrap` submodule, which provides:

- Character stats and abilities
- Weapon information and compatibility
- Enemy data for team optimization
- Multilingual content (Japanese/English)

## Deployment

The application is deployed on Firebase Hosting:

```bash
npm run build
firebase deploy
```

## Recent Updates

**December 2024**: Updated to latest stable versions

- React 19.1.0 → 19.2.3
- Next.js 15.5.4 → 16.0.10
- Material-UI 7.3.2 → 7.3.6
- Enhanced Turbopack performance
- Improved TypeScript support

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Documentation](https://react.dev/) - React concepts and patterns
- [Material-UI Documentation](https://mui.com/) - Component library
- [Zenless Zone Zero](https://zenless.hoyoverse.com/) - Official game website

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the established code style and patterns
4. Test your changes thoroughly
5. Submit a pull request

## License

This project is for educational and community purposes. Game assets and data belong to their respective owners.
