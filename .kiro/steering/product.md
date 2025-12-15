---
inclusion: always
---

# Product Requirements & Business Logic

## Application Purpose

**Grungerad.net** - Zenless Zone Zero team optimization and character management tools for game players.

## Core Features (IMPLEMENT EXACTLY)

### Team Builder (`/[lang]/team-builder`)

- **Purpose**: Algorithm-based team composition optimization
- **Max team size**: 3 characters (ZZZ game constraint)
- **Scoring system**: Character synergies, roles, elemental advantages
- **Persistence**: Local storage for user's character collection
- **UI**: Visual team display with character portraits and effectiveness scores

### Character Randomizer (`/[lang]/randomizer`)

- **Purpose**: Random team generation with filtering
- **Filters**: Specialty (Attack/Defense/Support/etc.), Element (Electric/Fire/Ice/etc.)
- **Constraints**: Balanced team composition, role diversity
- **UI**: Filter interface + randomized team display

## Game Data Structure (MANDATORY)

### Character Entities

```typescript
interface Character {
  name: { ja: string; en: string };
  specialty: "attack" | "defense" | "support" | "stun" | "anomaly" | "rupture";
  element: "electric" | "fire" | "ice" | "ether" | "physical" | "auricInk";
  rarity: "A" | "S";
  faction: string;
  weapons: WeaponType[];
  bomps: BompId[];
}
```

### Team Composition Rules

- **Team size**: Exactly 3 characters
- **Role balance**: Recommend diverse specialties
- **Elemental synergy**: Calculate advantages/disadvantages
- **Weapon compatibility**: Factor into scoring algorithms

## Data Sources (CRITICAL)

- **Primary source**: `submodule/zzz-wiki-scrap/data/`
- **Character data**: `characters.ts`, `bomps.ts`, `weapons.ts`
- **Images**: `public/assets/images/characters/`, `/bomps/`, `/weapons/`
- **Multilingual**: All content has Japanese (primary) and English versions

## User Experience Requirements

### Performance

- Mobile-first responsive design
- Optimized images with Next.js Image component
- Fast loading times, efficient data fetching
- Proper accessibility (ARIA labels, keyboard navigation)

### Internationalization

- Seamless language switching between Japanese/English
- Locale-aware formatting and content
- Default to Japanese locale

## Business Logic Constraints

### Scoring Algorithm Factors

1. Character synergies and counter-synergies
2. Elemental advantages in team composition
3. Specialty role balance (DPS/Support/Defense weighting)
4. Weapon type compatibility
5. Bomp (pet) associations and bonuses

### Data Management

- Maintain consistency between Japanese/English versions
- Use proper TypeScript interfaces for all game entities
- Implement structured data for SEO
- Cache static game data appropriately

## Technical Implementation Notes

- **Hosting**: Firebase Hosting (Asia-East1 region)
- **State**: Local storage for user preferences and character inventory
- **Error handling**: Graceful degradation for missing data
- **SEO**: Proper meta tags and structured data for game content
