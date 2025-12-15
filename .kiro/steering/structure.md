---
inclusion: always
---

# Project Structure & Architecture Patterns

## Directory Structure (FOLLOW EXACTLY)

```
src/
├── app/[lang]/          # Next.js App Router with i18n
├── components/          # Feature-grouped components
├── data/               # Static game data
├── stores/             # State management
└── @types/             # TypeScript declarations
public/assets/images/    # Game assets (characters, weapons, etc.)
submodule/zzz-wiki-scrap/ # External data source
```

## Component Organization (MANDATORY)

Group by feature, then by component:

```
components/
├── Character/          # Character-related UI
├── Filter/            # Filtering interfaces
├── ResourceSelector/  # Selection components
└── Site/             # Global site components
```

## Naming Conventions (STRICT)

- **Components**: PascalCase (`CharacterList/`, `TeamBox.tsx`)
- **Utilities/Data**: camelCase (`characters.ts`, `useTeamBuilder.ts`)
- **Routes**: kebab-case (`team-builder/`, `randomizer/`)
- **Props**: `ComponentNameProps` interface pattern
- **Constants**: UPPER_SNAKE_CASE

## Import Rules (ENFORCE)

```typescript
// Use path aliases
import { CharacterList } from "@/components/Character/CharacterList";
import { characters } from "@/data/characters";

// MUI named imports
import { Box, Typography, Button } from "@mui/material";

// Next.js defaults
import Image from "next/image";
import Link from "next/link";
```

## File Structure Rules

1. Use `index.tsx` for main component exports
2. Co-locate related files within feature folders
3. Mirror component structure in `public/assets/`
4. Create barrel exports for clean imports

## Internationalization Structure (CRITICAL)

- **Routes**: All pages under `[lang]/` dynamic segment
- **Content**: `{ ja: "日本語", en: "English" }` object pattern
- **Locale handling**: Middleware-based detection, Japanese default
- **Layout**: Root layout provides MUI theme + locale context

## State Management

- **Local**: React hooks (`useState`, `useReducer`)
- **Global**: TypeScript stores in `src/stores/`
- **Theme**: MUI built-in context
- **Server**: Next.js data fetching patterns

## Data Architecture

- **Source**: Git submodule `submodule/zzz-wiki-scrap/data/`
- **Types**: Proper TypeScript interfaces for all game entities
- **Multilingual**: All user-facing content has `ja` and `en` versions
