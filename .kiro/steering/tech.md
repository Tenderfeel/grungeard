---
inclusion: always
---

# Technical Stack & Development Guidelines

## Framework Stack (NEVER DEVIATE)

### Core Dependencies

- **Next.js 16.0.10** with App Router (NEVER use Pages Router)
- **React 19.2.3** with TypeScript 5.9.3 (functional components only)
- **Material-UI v7.3.6** (primary UI library)
- **Turbopack** for development builds

### Development Commands

```bash
npm run dev    # Development with Turbopack (ALWAYS use this)
npm run build  # Production build
npm run lint   # ESLint + TypeScript checks
```

## TypeScript Configuration (STRICT MODE)

### Type Safety Rules

```typescript
// NEVER use 'any' - use proper types
❌ const data: any = fetchData();
✅ const data: Character[] = fetchCharacters();

// Always define component props interfaces
❌ function Component(props) { ... }
✅ interface ComponentProps { ... }
   function Component({ prop1, prop2 }: ComponentProps) { ... }

// Use strict null checks
❌ character.name.ja  // Could be undefined
✅ character?.name?.ja ?? 'Unknown'
```

### Required Type Patterns

```typescript
// Props interface naming
interface ComponentNameProps {
  required: string;
  optional?: boolean;
}

// Event handler typing
interface EventHandlers {
  onSelect: (character: Character) => void;
  onTeamChange: (team: [Character, Character, Character]) => void;
}

// Utility function typing
function calculateScore(
  team: readonly [Character, Character, Character]
): number;
```

## Material-UI Styling (MANDATORY APPROACH)

### Styling Methods (ONLY THESE)

```typescript
// 1. sx prop (preferred for simple styles)
<Box sx={{
  display: 'flex',
  gap: 2,
  p: 3,
  bgcolor: 'background.paper'
}}>

// 2. styled() components (for reusable styles)
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

// 3. Theme-aware conditional styling
<Typography
  sx={{
    color: theme => theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark'
  }}
>
```

### Forbidden Styling Approaches

```typescript
❌ import './styles.css'           // No external CSS
❌ style={{ color: 'red' }}       // No inline styles
❌ className="custom-class"       // No custom CSS classes
```

### Typography Requirements

```typescript
// Always use MUI Typography with M PLUS 1p font
<Typography variant="h4" component="h1">
  {content[locale]}
</Typography>

// Font variants available: h1-h6, body1, body2, caption, button
```

## Image Handling (CRITICAL PERFORMANCE)

### Next.js Image Component (MANDATORY)

```typescript
import Image from 'next/image';

// Character portraits
<Image
  src={`/assets/images/characters/${character.id}.png`}
  alt={character.name[locale]}
  width={120}
  height={120}
  priority={isAboveFold}
/>

// Weapon icons
<Image
  src={`/assets/images/weapons/${weapon.id}.png`}
  alt={weapon.name[locale]}
  width={64}
  height={64}
  loading="lazy"
/>
```

### Image Optimization Rules

- Always specify `width` and `height`
- Use `priority={true}` for above-fold images
- Use `loading="lazy"` for below-fold images
- Provide meaningful `alt` text in current locale

## Internationalization Implementation

### Route Structure (ENFORCE)

```typescript
// All pages under [lang] dynamic segment
app / [lang] / page.tsx; // Home page
app / [lang] / team - builder / page.tsx; // Team builder
app / [lang] / randomizer / page.tsx; // Randomizer

// Middleware for locale detection
export function middleware(request: NextRequest) {
  // Detect locale from Accept-Language header
  // Redirect to appropriate /ja/ or /en/ route
}
```

### Content Localization Pattern

```typescript
// Define all text as bilingual objects
const content = {
  pageTitle: { ja: "チーム編成ツール", en: "Team Builder Tool" },
  selectCharacter: { ja: "キャラクターを選択", en: "Select Character" },
  teamScore: { ja: "チームスコア", en: "Team Score" },
};

// Component usage
function Header({ locale }: { locale: "ja" | "en" }) {
  return <Typography variant="h1">{content.pageTitle[locale]}</Typography>;
}
```

## Performance Requirements

### Bundle Optimization

```typescript
// Code splitting by route (automatic with App Router)
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <CircularProgress />,
});

// Lazy load character data
const { characters } = useMemo(() => import("@/data/characters"), []);
```

### Loading States (MANDATORY)

```typescript
// Always provide loading states
function CharacterList() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <CircularProgress />;
  }

  return <Grid>{/* character items */}</Grid>;
}
```

## Error Handling Patterns

### Error Boundaries (REQUIRED)

```typescript
// Wrap feature components in error boundaries
function TeamBuilderPage() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <TeamBuilder />
    </ErrorBoundary>
  );
}
```

### Graceful Degradation

```typescript
// Handle missing data gracefully
function CharacterCard({ character }: { character: Character }) {
  const imageSrc = character.imageUrl ?? "/assets/images/placeholder.png";
  const name = character.name?.[locale] ?? "Unknown Character";

  return (
    <Card>
      <Image src={imageSrc} alt={name} width={120} height={120} />
      <Typography>{name}</Typography>
    </Card>
  );
}
```

## SEO Implementation (MANDATORY)

### Metadata API Usage

```typescript
// In page.tsx files
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return {
    title: content.pageTitle[params.lang as "ja" | "en"],
    description: content.pageDescription[params.lang as "ja" | "en"],
    openGraph: {
      title: content.pageTitle[params.lang as "ja" | "en"],
      description: content.pageDescription[params.lang as "ja" | "en"],
      locale: params.lang,
    },
  };
}
```
