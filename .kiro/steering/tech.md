---
inclusion: always
---

# Technical Stack & Development Guidelines

## Framework Stack (MANDATORY)

- **Next.js 15.5.4** with App Router - Never use Pages Router
- **React 19.1.0** with TypeScript 5 - Functional components only, strict typing
- **Material-UI v7** - Use MUI components, avoid custom CSS
- **Turbopack** - Use `npm run dev` for development

## Code Style Rules (ENFORCE)

### TypeScript

- Strict mode enabled - Never use `any` type
- Use proper interfaces for all props: `ComponentNameProps`
- Path aliases: `@/*` maps to `./src/*`

### Styling

- MUI `sx` prop or `styled()` components only
- No external CSS files or inline styles
- Theme-aware components using MUI color scheme
- Typography via MUI Typography component with M PLUS 1p font

### File Naming

- Components: PascalCase (`CharacterList.tsx`)
- Utilities/data: camelCase (`characters.ts`)
- Routes: kebab-case (`team-builder/`)

## Internationalization (CRITICAL)

- All routes MUST use `[lang]` dynamic segments
- Support `ja` (default) and `en` locales
- All text content requires both languages: `{ ja: "日本語", en: "English" }`
- Use `@formatjs/intl-localematcher` and `negotiator` for detection

## Development Commands

```bash
npm run dev    # Development with Turbopack
npm run build  # Production build
npm run lint   # Code quality check
```

## Mandatory Patterns

- Functional components with TypeScript interfaces
- Next.js Image component for all images
- MUI theming for consistent styling
- Proper error boundaries and loading states
- SEO implementation with Next.js metadata API
