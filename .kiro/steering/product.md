---
inclusion: always
---

# Product Requirements & Business Logic

## Core Business Rules (NEVER VIOLATE)

### Team Composition Constraints

- **Exactly 3 characters per team** - ZZZ game rule, no exceptions
- Teams must be typed as `[Character, Character, Character]` tuple
- Validate team size before any operations (save, score, display)

### Data Sources (CRITICAL PATHS)

- **Primary data**: `submodule/zzz-wiki-scrap/data/` (characters.ts, bomps.ts, weapons.ts)
- **Images**: `public/assets/images/{characters|bomps|weapons|specialties|stats}/`
- **Never modify submodule data** - treat as read-only external source

### Internationalization Requirements

- **All user text**: `{ ja: "日本語", en: "English" }` object pattern
- **Default locale**: Japanese (`ja`), fallback to English (`en`)
- **Route structure**: `/[lang]/page-name` for all pages
- **Consistency**: Every Japanese string must have English equivalent

## Feature Implementation Rules

### Team Builder (`/[lang]/team-builder`)

```typescript
// Required interfaces
interface TeamBuilderState {
  selectedCharacters: Character[];
  availableCharacters: Character[];
  currentTeam: [Character, Character, Character] | null;
  teamScore: number;
}

// Scoring algorithm priorities
1. Specialty diversity (attack/defense/support/stun/anomaly/rupture)
2. Elemental synergy (electric/fire/ice/ether/physical/auricInk)
3. Faction bonuses
4. Weapon compatibility
5. Bomp associations
```

### Character Randomizer (`/[lang]/randomizer`)

- Generate random teams with filter constraints
- Ensure balanced composition (avoid 3 identical specialties)
- Filters: specialty, element, rarity (A/S)
- Re-randomize button with animation feedback

## Data Architecture Patterns

### Character Data Structure

```typescript
interface Character {
  id: string;
  name: { ja: string; en: string };
  specialty: "attack" | "defense" | "support" | "stun" | "anomaly" | "rupture";
  element: "electric" | "fire" | "ice" | "ether" | "physical" | "auricInk";
  rarity: "A" | "S";
  faction: string;
  weapons: WeaponType[];
  bomps: BompId[];
  imageUrl: string; // Path to character portrait
}
```

### State Management Rules

- **localStorage**: User character collection, team saves, preferences
- **sessionStorage**: Current filters, temporary team compositions
- **React state**: UI interactions, loading states
- **No external APIs**: All data is static/bundled

## User Experience Requirements

### Performance Standards

- Use Next.js `Image` component for all character/weapon/bomp images
- Implement lazy loading for character grids
- Optimize bundle size - code split by route
- Target <3s initial page load

### Accessibility Standards

- ARIA labels for all interactive elements
- Keyboard navigation for character selection
- Screen reader support for team composition
- High contrast mode compatibility

### Error Handling Patterns

```typescript
// Graceful degradation examples
- Missing character image → show placeholder
- Incomplete character data → hide affected features
- Invalid team composition → show validation message
- localStorage unavailable → use session state
```

## Implementation Constraints

### Mobile-First Design

- Touch-friendly character selection (min 44px targets)
- Responsive team layout (stack on mobile, grid on desktop)
- Swipe gestures for character browsing
- Optimized for portrait orientation

### SEO Requirements

- Structured data for character/weapon entities
- Meta descriptions for team builder pages
- Open Graph tags for social sharing
- Sitemap generation for all routes

### Data Validation Rules

- Validate team size before scoring/saving
- Check character availability before team creation
- Ensure all required character properties exist
- Fallback to default values for missing optional data
