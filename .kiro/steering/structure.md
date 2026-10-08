---
inclusion: always
---

# Project Structure & Architecture Patterns

## Directory Structure (ENFORCE EXACTLY)

```
src/
├── app/[lang]/                    # Next.js App Router with i18n
│   ├── layout.tsx                 # Root layout with MUI theme
│   ├── page.tsx                   # Home page
│   ├── team-builder/              # Team building feature
│   └── randomizer/                # Character randomizer
├── components/                    # Feature-grouped components
│   ├── Character/                 # Character selection/display
│   ├── Filter/                    # Filtering interfaces
│   ├── ResourceSelector/          # Multi-resource selection
│   └── Site/                      # Global site components
├── data/                          # Static game data imports
├── stores/                        # Global state management
└── @types/                        # TypeScript declarations

public/assets/images/              # Game assets (DO NOT MODIFY)
submodule/zzz-wiki-scrap/         # External data source (READ-ONLY)
```

## Component Architecture (MANDATORY PATTERNS)

### Component File Structure

```typescript
// For complex components
components/Feature/ComponentName/
├── index.tsx              # Main component export
├── types.ts              # Component-specific types
└── utils.ts              # Component-specific utilities

// For simple components
components/Feature/ComponentName.tsx
```

### Component Interface Pattern

```typescript
// Always define props interface
interface ComponentNameProps {
  // Required props first
  data: RequiredType;
  onAction: (value: string) => void;

  // Optional props with defaults
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function ComponentName({
  data,
  onAction,
  variant = "primary",
  disabled = false,
}: ComponentNameProps) {
  // Implementation
}
```

## Naming Conventions (STRICT ENFORCEMENT)

### File Naming Rules

- **Components**: PascalCase (`CharacterList.tsx`, `TeamBox.tsx`)
- **Utilities**: camelCase (`teamScoring.ts`, `characterUtils.ts`)
- **Routes**: kebab-case (`team-builder/`, `randomizer/`)
- **Types**: PascalCase (`Character.ts`, `TeamComposition.ts`)
- **Constants**: UPPER_SNAKE_CASE (`TEAM_SIZE_LIMIT`, `DEFAULT_LOCALE`)

### Import Organization (ENFORCE ORDER)

```typescript
// 1. External libraries
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

// 2. Internal utilities/types
import { Character, Team } from "@/types";
import { calculateTeamScore } from "@/utils/teamScoring";

// 3. Components (feature-grouped)
import { CharacterList } from "@/components/Character/CharacterList";
import { FilterPanel } from "@/components/Filter/FilterPanel";

// 4. Data imports
import { characters } from "@/data/characters";
```

## Path Alias Configuration

```typescript
// Use these exact aliases
"@/*": "./src/*"
"@/components/*": "./src/components/*"
"@/data/*": "./src/data/*"
"@/types/*": "./src/@types/*"
"@/stores/*": "./src/stores/*"
```

## Internationalization Architecture

### Route Structure (CRITICAL)

```typescript
// All pages MUST be under [lang] dynamic segment
app/[lang]/
├── layout.tsx           # Provides locale context
├── page.tsx            # Home: /ja/ or /en/
├── team-builder/       # Team builder: /ja/team-builder
└── randomizer/         # Randomizer: /ja/randomizer

// Middleware handles locale detection and redirects
```

### Content Pattern (MANDATORY)

```typescript
// All user-facing text as bilingual objects
interface BilingualText {
  ja: string;
  en: string;
}

// Usage examples
const labels = {
  teamBuilder: { ja: "チーム編成", en: "Team Builder" },
  randomizer: { ja: "ランダマイザー", en: "Randomizer" },
};

// Component usage
function PageTitle({ locale }: { locale: "ja" | "en" }) {
  return <h1>{labels.teamBuilder[locale]}</h1>;
}
```

## Data Import Patterns

### External Data Integration

```typescript
// Import from submodule (READ-ONLY)
import { characters as rawCharacters } from "../submodule/zzz-wiki-scrap/data/characters";
import { bomps as rawBomps } from "../submodule/zzz-wiki-scrap/data/bomps";

// Transform for app use
export const characters: Character[] = rawCharacters.map(transformCharacter);
export const bomps: Bomp[] = rawBomps.map(transformBomp);
```

### Asset Path Conventions

```typescript
// Character images
`/assets/images/characters/${character.id}.png`// Weapon images
`/assets/images/weapons/${weapon.id}.png`// Bomp images
`/assets/images/bomps/${bomp.id}.png`// Specialty icons
`/assets/images/specialties/${specialty}.png`;
```

## State Management Architecture

### Local Component State

```typescript
// Use for UI-only state
const [isLoading, setIsLoading] = useState(false);
const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
  null
);
```

### Global State (stores/)

```typescript
// For cross-component data
interface AppStore {
  locale: "ja" | "en";
  userCharacters: Character[];
  savedTeams: Team[];
  preferences: UserPreferences;
}
```

### Persistence Patterns

```typescript
// localStorage for user data
const STORAGE_KEYS = {
  USER_CHARACTERS: "zzz_user_characters",
  SAVED_TEAMS: "zzz_saved_teams",
  PREFERENCES: "zzz_preferences",
} as const;

// sessionStorage for temporary state
const SESSION_KEYS = {
  CURRENT_FILTERS: "zzz_current_filters",
  DRAFT_TEAM: "zzz_draft_team",
} as const;
```
