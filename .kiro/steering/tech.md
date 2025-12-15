---
inclusion: always
---

# Technical Stack & Development Guidelines

## Core Stack (STRICT REQUIREMENTS)

- **Next.js 16.0.10** with App Router only (never Pages Router)
- **React 19.2.3** with TypeScript 5.9.3 (functional components only)
- **Material-UI v7.3.6** for all UI components
- **Development**: Always use `npm run dev` (Turbopack enabled)

## TypeScript Rules (ENFORCE STRICTLY)

### Mandatory Patterns

```typescript
// Never use 'any' - always type properly
interface ComponentProps {
  data: Character[];
  onSelect: (character: Character) => void;
  locale: "ja" | "en";
}

// Always use optional chaining and nullish coalescing
const name = character?.name?.[locale] ?? "Unknown";

// Team compositions must be exact tuples
type Team = readonly [Character, Character, Character];
```

### Component Structure

```typescript
// Required pattern for all components
interface ComponentNameProps {
  required: string;
  optional?: boolean;
}

export function ComponentName({
  required,
  optional = false,
}: ComponentNameProps) {
  // Implementation
}
```

## Material-UI Styling (ONLY ALLOWED METHODS)

### Approved Styling

```typescript
// 1. sx prop (preferred)
<Box sx={{ display: 'flex', gap: 2, p: 3 }}>

// 2. styled() for reusable components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}));

// 3. Theme-aware conditional styles
<Typography sx={{ color: theme => theme.palette.primary.main }}>
```

### Forbidden Approaches

- ❌ External CSS files (`import './styles.css'`)
- ❌ Inline styles (`style={{ color: 'red' }}`)
- ❌ Custom CSS classes (`className="custom"`)

## Image Handling (PERFORMANCE CRITICAL)

### Next.js Image Component (MANDATORY)

```typescript
import Image from "next/image";

// Always specify dimensions and optimization
<Image
  src={`/assets/images/characters/${character.id}.png`}
  alt={character.name[locale]}
  width={120}
  height={120}
  priority={isAboveFold}
  loading={isAboveFold ? undefined : "lazy"}
/>;
```

### Asset Path Conventions

- Characters: `/assets/images/characters/${id}.png`
- Weapons: `/assets/images/weapons/${id}.png`
- Bomps: `/assets/images/bomps/${id}.png`
- Specialties: `/assets/images/specialties/${type}.png`

## Internationalization (STRICT PATTERN)

### Route Structure

All pages must be under `app/[lang]/` with locale parameter:

- `/ja/` or `/en/` for home
- `/ja/team-builder` or `/en/team-builder`
- `/ja/randomizer` or `/en/randomizer`

### Content Pattern

```typescript
// All user-facing text as bilingual objects
const content = {
  title: { ja: "チーム編成", en: "Team Builder" },
  button: { ja: "選択", en: "Select" },
};

// Usage in components
function Header({ locale }: { locale: "ja" | "en" }) {
  return <Typography>{content.title[locale]}</Typography>;
}
```

## Performance Requirements

### Loading States

Always provide loading UI for async operations:

```typescript
function DataComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) return <CircularProgress />;
  return <ActualContent />;
}
```

### Code Splitting

Use dynamic imports for heavy components:

```typescript
const HeavyComponent = dynamic(() => import("./Heavy"), {
  loading: () => <CircularProgress />,
});
```

## Error Handling (MANDATORY)

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

### Error Boundaries

Wrap feature components in error boundaries:

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <FeatureComponent />
</ErrorBoundary>
```

## SEO Implementation

### Metadata Generation

```typescript
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  return {
    title: content.pageTitle[params.lang as "ja" | "en"],
    description: content.pageDescription[params.lang as "ja" | "en"],
    openGraph: {
      title: content.pageTitle[params.lang as "ja" | "en"],
      locale: params.lang,
    },
  };
}
```
