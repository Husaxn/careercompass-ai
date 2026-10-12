# CareerCompass AI - Design Notes

## Color Tokens (from `src/constants/theme.ts`)

### Light Mode
- `text`: `#000000`
- `background`: `#ffffff`
- `backgroundElement`: `#F0F0F3`
- `backgroundSelected`: `#E0E1E6`
- `textSecondary`: `#60646C`
- `brand`: `#3c87f7`
- `onBrand`: `#ffffff`

### Dark Mode
- `text`: `#ffffff`
- `background`: `#000000`
- `backgroundElement`: `#212225`
- `backgroundSelected`: `#2E3135`
- `textSecondary`: `#B0B4BA`
- `brand`: `#4f9cff`
- `onBrand`: `#0b0b0d`

### Additional Colors Used in Components
- Success/Green: `#10B981` (used for positive metrics, skill match)
- Warning/Amber: `#F59E0B` (used for status badges)
- Danger/Red: `#EF4444` (used for notifications, destructive actions)
- Purple/Brand Accent: `#7C3AED` (used in sidebar logo, profile card gradient)
- Dark Sidebar Background: `#0d0d16` (hardcoded in sidebar.tsx)
- Sidebar Border: `#1F202E`

## Radii (from Spacing in theme.ts)
- `Spacing.one` (4): Small radius for buttons, chips, badges
- `Spacing.two` (8): Medium radius for inputs, cards, modals
- `Spacing.three` (16): Large radius for main cards, sheets
- `999`: Full circle for avatars, circular progress

## Spacing Scale
- `half`: 2
- `one`: 4
- `two`: 8
- `three`: 16
- `four`: 24
- `five`: 32
- `six`: 64

## Font Sizes/Weights (TypeScale)
- `heading`: 32px, lineHeight 40, weight 700
- `subheading`: 20px, lineHeight 28, weight 600
- `body`: 16px, lineHeight 24, weight 500
- `caption`: 14px, lineHeight 20, weight 500
- `captionBold`: 14px, lineHeight 20, weight 700

### Additional ThemedText Types
- `title`: 48px, weight 600
- `subtitle`: 32px, weight 600
- `small`: 14px, weight 500
- `smallBold`: 14px, weight 700
- `link`: 14px, lineHeight 30
- `linkPrimary`: 14px, color `#3c87f7`
- `code`: 12px, monospace

## Card Pattern
- Background: `backgroundElement` (via `ThemedView type="backgroundElement"`)
- Border: `1px solid #1F202E` (dark) / implicit via theme
- Border Radius: `Spacing.three` (16)
- Padding: `Spacing.four` (24)
- Gap: `Spacing.one` (4) to `Spacing.three` (16) depending on content

## Button Patterns

### Primary Button
- Background: `brand` (`#3c87f7` light / `#4f9cff` dark)
- Text Color: `onBrand` (white / dark)
- Padding Vertical: `Spacing.three` (16)
- Border Radius: `Spacing.two` (8)
- Font: `smallBold` (14px, weight 700)
- Pressed State: `opacity: 0.8`

### Secondary Button (Outlined)
- Border: `1px solid #3c87f7`
- Text Color: `brand`
- Background: Transparent
- Same padding/radius as primary

### Ghost/Link Button
- No background, no border
- Text Color: `brand` (via `linkPrimary` type)
- Font: `small` or `smallBold`

### Destructive Button
- Background: `#e5484d` (DANGER constant)
- Border: Same color
- Text Color: White

## Input Pattern
- Border: `1px solid backgroundElement` / `backgroundSelected`
- Border Radius: `Spacing.two` (8)
- Padding: `Spacing.three` (16)
- Font Size: 16px
- Text Color: `theme.text`
- Placeholder Color: `theme.textSecondary`
- Container: Flex row for icons (visibility toggle)

## Header Pattern
- Page Title: `ThemedText type="subtitle"` (32px) or `type="title"` (48px)
- Subtitle: `ThemedText themeColor="textSecondary"` (body size)
- Section Headers: `ThemedText type="smallBold"` (14px, weight 700) or `type="captionBold"`
- Card Titles: `ThemedText type="smallBold"` with color `text`

## Section Titles
- Style: `ThemedText type="smallBold"` or `type="captionBold"`
- Color: `text` (primary) or `textSecondary` (muted)
- Often in flex row with trailing action (e.g., "View All")

## Empty/Loading/Error Patterns

### Loading
- `ActivityIndicator size="large" color="#3c87f7"`
- Centered in `StatePanel` or full-screen container
- Text: "Loading…" with `type="small" themeColor="textSecondary"`

### Empty State
- `StatePanel` component with `empty={true}`
- Text: `ThemedText type="small" themeColor="textSecondary"`
- Custom message via `emptyText` prop

### Error State
- `ThemedText type="subtitle"` for title ("Analysis failed")
- `ThemedText themeColor="textSecondary"` for message
- Retry button: Primary style with "Try again" label
- Inline error messages in forms use `Alert.alert` or inline text with danger color

## ScreenContainer / ResponsiveContainer

### ScreenContainer (`src/components/layout/screen-container.tsx`)
- Wraps content in `ThemedView` with `flex: 1`
- Optional scroll via `ScrollView` (default: true)
- Centers content horizontally with `maxWidth: 800` (MaxContentWidth)
- Padding: `Spacing.four` (24) when `padded={true}` (default)

### ResponsiveContainer (`src/components/layout/responsive-container.tsx`)
- **Web** (`Platform.OS === 'web'`): Renders `Sidebar` (270px fixed width) + `ScreenContainer` in flex row
- **Mobile**: Renders `ScreenContainer` + `TabBar` at bottom
- Passes through `scroll`, `padded`, `style`, `contentContainerStyle` to ScreenContainer

## Dark/Light Mode Handling
- `useColorScheme` hook from `expo-router` / `react-native`
- `useTheme` hook returns merged color object for current scheme
- `ThemedView` and `ThemedText` automatically use theme colors via `type` or `themeColor` props
- No hardcoded hex colors in components (except sidebar which has some hardcoded dark values)
- CSS variables for fonts on web via `Fonts` in theme.ts

## Key UI Components to Reuse/Extend

### Existing Components
- `ThemedText` - All text rendering
- `ThemedView` - All background containers
- `ScreenContainer` / `ResponsiveContainer` - Layout wrappers
- `StatePanel` - Loading/empty/error states
- `Collapsible` - Expandable sections
- `UserAvatar` - Profile images
- `BookmarkButton` - Save/bookmark toggle
- `SymbolView` from `expo-symbols` - Icons

### Missing Components to Create (for new screens)
1. **ScoreRing** - Circular progress indicator (ATS score, coverage)
2. **Chip** - Small labeled tags (keywords, skills, priority badges)
3. **ProgressBar** - Horizontal progress bar (skill gaps, match percentages)
4. **EmptyState** - Enhanced empty state with illustration/action
5. **Input** - Styled text input wrapper
6. **Button** - Primary/secondary/ghost button components
7. **Card** - Standardized card wrapper

## Navigation Patterns
- Tabs layout: `src/app/(tabs)/_layout.tsx` with Stack screens
- Web: Sidebar navigation (270px fixed)
- Mobile: Bottom TabBar (5 items only: home, profile, resume-analyzer, skill-assessment, roadmap)
- Detail screens: Push onto stack, use `BackBar` for in-content back button
- Modal sheets for actions (image picker, confirm dialogs)

## Store Pattern
- `createStore` factory with `useSyncExternalStore`
- Persistence via `AsyncStorage` with debounced writes (250ms)
- Hydration tracking with `waitForHydration()`
- One store per feature domain
- Selectors via custom hooks (e.g., `useUser`, `useMilestones`)

## AI Service Pattern
- Single file: `src/services/ai.ts` (to be created/consolidated)
- Uses `@google/generative-ai` with `gemini-1.5-flash`
- Structured JSON output via `responseSchema` (zod for validation)
- Error handling: throw/catch, show error UI with retry button
- NO mock fallbacks in production code (analyzer-service.ts has local mock for dev only)

## File Structure for New Features
```
src/features/<feature-name>/
├── screens/
│   ├── <screen-name>.tsx
│   └── index.ts
├── components/
│   └── <shared-components>.tsx
├── types.ts
├── store.ts (or hooks.ts)
├── index.ts (barrel export)
└── README.md
```

## Tab Bar Items (Mobile - 5 items)
1. Home (Dashboard)
2. Profile
3. Resume Analyzer
4. Skill Assessment
5. Roadmap

## Sidebar Items (Web - 11 items)
All 11 items listed in NAV_ITEMS in sidebar.tsx