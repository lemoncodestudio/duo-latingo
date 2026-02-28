# Components Referentie

> Overzicht van alle herbruikbare componenten in Duo Latingo.
> Gebruik dit document als referentie bij het bouwen van nieuwe pagina's.

---

## Inhoudsopgave

### UI (Primitieven)
- [Button](#button)
- [Card](#card)
- [Input](#input)
- [Label](#label)
- [Progress](#progress)
- [Badge](#badge)
- [Dialog](#dialog)
- [Tabs](#tabs)
- [Avatar](#avatar)
- [Separator](#separator)
- [DropdownMenu](#dropdownmenu)
- [Toaster](#toaster)

### Shared
- [Mascot](#mascot)
- [Navbar](#navbar)
- [BottomNav](#bottomnav)
- [StepIndicator](#stepindicator)
- [SignOutButton](#signoutbutton)
- [AmbientParticles](#ambientparticles)

### Dashboard
- [StreakDisplay](#streakdisplay)
- [StatsCards](#statscards)
- [CourseProgressBar](#courseprogressbar)
- [CourseCard](#coursecard)
- [DailyTipCard](#dailytipcard)

### Practice
- [MultipleChoice](#multiplechoice)
- [TypeAnswer](#typeanswer)
- [FeedbackBanner](#feedbackbanner)
- [PracticeProgressBar](#practiceprogressbar)
- [StartPracticeButton](#startpracticebutton)

### Upload
- [PhotoUploadZone](#photouploadzone)
- [ExtractedWordsReview](#extractedwordsreview)

---

## UI (Primitieven)

Gebaseerd op shadcn/ui met Radix UI primitieven. Alle UI-componenten accepteren `className` voor styling-overrides via `cn()`.

---

### Button

**Bestand:** `src/components/ui/button.tsx`
**Beschrijving:** Universele button met Duo Lingo-achtige 3D-stijlen, standaard shadcn varianten en game-achtige varianten.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" \| "duo" \| "duo-red" \| "duo-blue" \| "duo-outline"` | `"default"` | Visuele stijl |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg" \| "duo"` | `"default"` | Grootte |
| `asChild` | `boolean` | `false` | Render als child element (Radix Slot) |
| `...props` | `React.ComponentProps<"button">` | — | Alle native button props |

#### Design Tokens
- **duo**: `gradient.teal`, `color.primary.foreground`, `shadow.button.bottom` (3D border-bottom effect)
- **duo-red**: `gradient.rose`, rose border
- **duo-blue**: ocean gradient, ocean border
- **duo-outline**: `color.border.subtle`, `color.border.emphasis` on hover

#### Voorbeeld

```tsx
import { Button } from "@/components/ui/button";

<Button variant="duo" size="duo">Start oefening</Button>
<Button variant="duo-outline" size="sm">Annuleren</Button>
<Button variant="ghost" size="icon"><X /></Button>
```

---

### Card

**Bestand:** `src/components/ui/card.tsx`
**Beschrijving:** Container component voor content blokken. Bevat subcomponenten voor header, title, description, content, footer en action.

#### Exports & Props

| Component | Props | Beschrijving |
|-----------|-------|-------------|
| `Card` | `React.ComponentProps<"div">` | Wrapper met `bg-card`, border, shadow, rounded-xl |
| `CardHeader` | `React.ComponentProps<"div">` | Grid-based header met auto-layout voor action |
| `CardTitle` | `React.ComponentProps<"div">` | Semibold heading |
| `CardDescription` | `React.ComponentProps<"div">` | Muted beschrijvingstekst |
| `CardAction` | `React.ComponentProps<"div">` | Actie-element rechtsbovenin de header |
| `CardContent` | `React.ComponentProps<"div">` | Body content met px-6 padding |
| `CardFooter` | `React.ComponentProps<"div">` | Footer met flex layout |

#### Design Tokens
- `color.background.card`, `gradient.card`, `shadow.elevation.card`

#### Voorbeeld

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Cursus overzicht</CardTitle>
  </CardHeader>
  <CardContent>Inhoud hier...</CardContent>
</Card>
```

---

### Input

**Bestand:** `src/components/ui/input.tsx`
**Beschrijving:** Gestylede text input met focus ring en validation states.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `type` | `string` | — | HTML input type |
| `...props` | `React.ComponentProps<"input">` | — | Alle native input props |

#### Design Tokens
- `color.border.default`, `color.ring.default` (focus), `color.text.muted` (placeholder)

#### Voorbeeld

```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="Zoek woorden..." type="text" />
```

---

### Label

**Bestand:** `src/components/ui/label.tsx`
**Beschrijving:** Toegankelijk form label (Radix Label primitive). Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `...props` | `React.ComponentProps<LabelPrimitive.Root>` | — | Radix Label props incl. `htmlFor` |

#### Voorbeeld

```tsx
import { Label } from "@/components/ui/label";

<Label htmlFor="name">Cursusnaam</Label>
```

---

### Progress

**Bestand:** `src/components/ui/progress.tsx`
**Beschrijving:** Horizontale voortgangsbalk (Radix Progress primitive). Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `value` | `number` | `0` | Percentage (0–100) |
| `...props` | `React.ComponentProps<ProgressPrimitive.Root>` | — | Radix Progress props |

#### Design Tokens
- Track: `color.background.progress-track` (`bg-primary/20`)
- Fill: `color.primary.default`

#### Voorbeeld

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={65} />
```

---

### Badge

**Bestand:** `src/components/ui/badge.tsx`
**Beschrijving:** Inline label/tag met varianten.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | Visuele stijl |
| `asChild` | `boolean` | `false` | Render als child element |
| `...props` | `React.ComponentProps<"span">` | — | Alle native span props |

#### Voorbeeld

```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="secondary">Nieuw</Badge>
```

---

### Dialog

**Bestand:** `src/components/ui/dialog.tsx`
**Beschrijving:** Modal dialog (Radix Dialog primitive). Client component.

#### Exports & Props

| Component | Extra Props | Beschrijving |
|-----------|-------------|-------------|
| `Dialog` | — | Root wrapper (controlled/uncontrolled) |
| `DialogTrigger` | — | Element dat de dialog opent |
| `DialogContent` | `showCloseButton?: boolean` (default `true`) | Modal content met overlay |
| `DialogHeader` | — | Header layout |
| `DialogFooter` | `showCloseButton?: boolean` (default `false`) | Footer met optionele close button |
| `DialogTitle` | — | Titel |
| `DialogDescription` | — | Beschrijving |
| `DialogClose` | — | Sluit-element |
| `DialogOverlay` | — | Achtergrond overlay |
| `DialogPortal` | — | Portal wrapper |

#### Voorbeeld

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Bevestig actie</DialogTitle>
    </DialogHeader>
    <p>Inhoud...</p>
  </DialogContent>
</Dialog>
```

---

### Tabs

**Bestand:** `src/components/ui/tabs.tsx`
**Beschrijving:** Tab navigatie (Radix Tabs primitive). Ondersteunt horizontal/vertical en default/line varianten. Client component.

#### Exports & Props

| Component | Extra Props | Beschrijving |
|-----------|-------------|-------------|
| `Tabs` | `orientation?: "horizontal" \| "vertical"` | Root container |
| `TabsList` | `variant?: "default" \| "line"` | Tab-knoppen container |
| `TabsTrigger` | — | Individuele tab |
| `TabsContent` | — | Content panel per tab |

#### Voorbeeld

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="woorden">
  <TabsList>
    <TabsTrigger value="woorden">Woorden</TabsTrigger>
    <TabsTrigger value="zinnen">Zinnen</TabsTrigger>
  </TabsList>
  <TabsContent value="woorden">...</TabsContent>
  <TabsContent value="zinnen">...</TabsContent>
</Tabs>
```

---

### Avatar

**Bestand:** `src/components/ui/avatar.tsx`
**Beschrijving:** Gebruikersavatar met afbeelding, fallback, badge en groepering. Client component.

#### Exports & Props

| Component | Extra Props | Beschrijving |
|-----------|-------------|-------------|
| `Avatar` | `size?: "default" \| "sm" \| "lg"` | Root (32/24/40px) |
| `AvatarImage` | Radix Image props (`src`, `alt`) | Afbeelding |
| `AvatarFallback` | — | Fallback (initialen) |
| `AvatarBadge` | `React.ComponentProps<"span">` | Status indicator |
| `AvatarGroup` | — | Groepering met overlap |
| `AvatarGroupCount` | — | "+N" indicator |

#### Voorbeeld

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

<Avatar size="lg">
  <AvatarImage src="/avatar.jpg" alt="Gebruiker" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

### Separator

**Bestand:** `src/components/ui/separator.tsx`
**Beschrijving:** Visuele scheidingslijn (Radix Separator). Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Richting |
| `decorative` | `boolean` | `true` | Decoratief (geen semantiek) |

---

### DropdownMenu

**Bestand:** `src/components/ui/dropdown-menu.tsx`
**Beschrijving:** Dropdown menu met submenus, checkboxes, radio items (Radix DropdownMenu). Client component.

#### Belangrijkste Exports

`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`

#### DropdownMenuItem Extra Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `inset` | `boolean` | — | Extra left padding |
| `variant` | `"default" \| "destructive"` | `"default"` | Stijlvariant |

---

### Toaster

**Bestand:** `src/components/ui/sonner.tsx`
**Beschrijving:** Toast notificatie systeem (Sonner library). Thema-aware. Client component.

#### Props

Alle `ToasterProps` van sonner. Gebruikt automatisch next-themes.

#### Voorbeeld

```tsx
// In layout:
import { Toaster } from "@/components/ui/sonner";
<Toaster />

// Triggeren:
import { toast } from "sonner";
toast.success("Woord opgeslagen!");
```

---

## Shared

---

### Mascot

**Bestand:** `src/components/shared/mascot.tsx`
**Beschrijving:** SVG mascotte (teal uil) met verschillende gezichtsuitdrukkingen. Gebruikt in navbar, feedback banners en lege states.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `expression` | `"happy" \| "excited" \| "sad" \| "thinking" \| "celebrating"` | `"happy"` | Gezichtsuitdrukking |
| `size` | `number` | `120` | Breedte en hoogte in px |
| `className` | `string` | `""` | Extra CSS classes |

#### Design Tokens
- Body: `gradient.teal` (#40E0D0 -> #2BC4B4)
- Beak/feet: `color.orange.default` (#FBBF24)
- Eyes: `color.background.popover` (#1a2d55)
- Celebrating particles: `color.blue.default`, `color.rose.default`, `color.purple.light`

#### Voorbeeld

```tsx
import { Mascot } from "@/components/shared/mascot";

<Mascot expression="celebrating" size={80} />
<Mascot expression="sad" size={56} className="shrink-0" />
```

---

### Navbar

**Bestand:** `src/components/shared/navbar.tsx`
**Beschrijving:** Top navigatiebalk met brand logo (Mascot), desktop nav links, streak badge en avatar. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `streak` | `number` | `0` | Huidige streak (toont badge als > 0) |
| `displayName` | `string \| null` | — | Naam voor avatar initiaal |

#### Design Tokens
- Background: `color.background.nav` (semi-transparent + backdrop-blur)
- Brand text: `gradient.hero`
- Active link: `color.primary.ghost`
- Streak badge: `color.orange.default`, `color.orange.ghost`
- Avatar border: `color.primary.default`, `shadow.glow.teal-sm`

#### Voorbeeld

```tsx
import { Navbar } from "@/components/shared/navbar";

<Navbar streak={7} displayName="Jan" />
```

---

### BottomNav

**Bestand:** `src/components/shared/bottom-nav.tsx`
**Beschrijving:** Mobiele bottom tab bar met Home, Cursussen en Profiel. Verborgen op desktop (`md:hidden`). Client component.

#### Props

Geen props. Navigatie-items zijn hardcoded.

#### Navigatie-items

| Label | Href | Icon |
|-------|------|------|
| Home | `/dashboard` | `Home` (lucide) |
| Cursussen | `/courses` | `BookOpen` (lucide) |
| Profiel | `/profile` | `User` (lucide) |

#### Design Tokens
- Background: `color.background.nav-bottom` (semi-transparent + backdrop-blur)
- Active: `color.primary.default` met teal glow indicator
- Inactive: `color.text.dimmed`

#### Voorbeeld

```tsx
import { BottomNav } from "@/components/shared/bottom-nav";

<BottomNav />
```

---

### StepIndicator

**Bestand:** `src/components/shared/step-indicator.tsx`
**Beschrijving:** Horizontale stap-indicator met genummerde cirkels en verbindingslijnen. Gebruikt bij multi-step flows (bijv. upload).

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `steps` | `string[]` | — | Array van staplabels |
| `currentStep` | `number` | — | Huidige stap (0-indexed) |

#### Design Tokens
- Active: `color.primary.default`, `color.primary.foreground` met 3D border effect
- Completed: `color.primary.default`
- Inactive: `bg-secondary`, `color.text.dimmed`

#### Voorbeeld

```tsx
import { StepIndicator } from "@/components/shared/step-indicator";

<StepIndicator steps={["Upload", "Controleer", "Opslaan"]} currentStep={1} />
```

---

### SignOutButton

**Bestand:** `src/components/shared/sign-out-button.tsx`
**Beschrijving:** Uitlog-button die Supabase auth signout aanroept en redirect naar `/login`. Client component.

#### Props

Geen props.

#### Design Tokens
- `color.rose.default` tekst, `color.rose.ghost` hover

#### Voorbeeld

```tsx
import { SignOutButton } from "@/components/shared/sign-out-button";

<SignOutButton />
```

---

### AmbientParticles

**Bestand:** `src/components/shared/ambient-particles.tsx`
**Beschrijving:** Decoratieve zwevende deeltjes als achtergrond-effect. Fixed overlay, pointer-events-none. Client component.

#### Props

Geen props. Deeltjes zijn hardcoded met vaste posities, kleuren en animatietijden.

#### Design Tokens
- Particle kleuren: `color.primary.default` (teal), `color.purple.default`, `color.green.default`, `color.orange.default`
- Animatie: `animate-float-particle` (gedefinieerd in globals.css)

#### Voorbeeld

```tsx
import { AmbientParticles } from "@/components/shared/ambient-particles";

// In layout:
<AmbientParticles />
```

---

## Dashboard

---

### StreakDisplay

**Bestand:** `src/components/dashboard/streak-display.tsx`
**Beschrijving:** Streak-kaart met vlamicoon, aantal dagen, langste streak en weekoverzicht met dag-indicatoren. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `streak` | `number` | — | Huidige streak in dagen |
| `longestStreak` | `number` | — | Langste streak ooit |

#### Design Tokens
- Background: `gradient.streak`
- Border: `color.border.orange`
- Streak getal: `color.orange.default`
- Active dag: `gradient.orange`, `shadow.glow.orange`
- Today dag: `color.orange.default` border, `animate-today-pulse`
- Flame: `animate-flame`, `animate-glow-pulse`

#### Voorbeeld

```tsx
import { StreakDisplay } from "@/components/dashboard/streak-display";

<StreakDisplay streak={7} longestStreak={14} />
```

---

### StatsCards

**Bestand:** `src/components/dashboard/stats-cards.tsx`
**Beschrijving:** Grid van 3 statistiekkaarten: XP, Woorden geleerd en Sessies voltooid.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `xp` | `number` | — | Totaal XP |
| `wordsLearned` | `number` | — | Aantal geleerde woorden |
| `sessionsCompleted` | `number` | — | Aantal voltooide sessies |

#### Design Tokens
- XP: `gradient.stat-teal`, `color.primary.default`, `shadow.hover.teal`
- Woorden: `gradient.stat-purple`, `color.purple.light`, `shadow.hover.purple`
- Sessies: `gradient.stat-green`, `color.green.default`, `shadow.hover.green`
- Borders: `color.border.default` (teal/purple/green variants)

#### Voorbeeld

```tsx
import { StatsCards } from "@/components/dashboard/stats-cards";

<StatsCards xp={1250} wordsLearned={42} sessionsCompleted={8} />
```

---

### CourseProgressBar

**Bestand:** `src/components/dashboard/course-progress-bar.tsx`
**Beschrijving:** Voortgangsbalk met kleurvariant en optioneel label (current/total + percentage).

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `current` | `number` | — | Aantal geleerde woorden |
| `total` | `number` | — | Totaal aantal woorden |
| `variant` | `"teal" \| "purple" \| "green" \| "coral"` | `"teal"` | Kleurvariant |
| `showLabel` | `boolean` | `true` | Toon "X / Y woorden geleerd" + percentage |

#### Design Tokens
- Track: `color.background.progress-track`
- Fill gradients per variant: `gradient.teal`/`gradient.purple`/`gradient.green`/`gradient.rose`
- Shine effect: wit highlight blur overlay
- Label kleuren per variant

#### Voorbeeld

```tsx
import { CourseProgressBar } from "@/components/dashboard/course-progress-bar";

<CourseProgressBar current={15} total={30} variant="purple" />
<CourseProgressBar current={5} total={20} variant="teal" showLabel={false} />
```

---

### CourseCard

**Bestand:** `src/components/dashboard/course-card.tsx`
**Beschrijving:** Cursuskaart met automatisch emoji, kleurvariant (gebaseerd op naam-hash), hoofdstukken/woorden info en voortgangsbalk. Link naar cursusdetail.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `course` | `Course` (Supabase type) | — | Cursus object met `id` en `name` |
| `wordCount` | `number` | — | Totaal aantal woorden |
| `chapterCount` | `number` | — | Aantal hoofdstukken |
| `wordsLearned` | `number` | `0` | Voortgang |

#### Automatische logica
- **Emoji**: bepaald op basis van cursusnaam (Spaans -> flag, Latijn -> tempel, etc.)
- **Kleurvariant**: deterministische hash van cursusnaam -> teal/purple/green/coral

#### Design Tokens
- Background: `gradient.card`
- Border: `color.border.subtle`, `color.border.hover` on hover
- Icon: `gradient.teal`/`gradient.purple`/`gradient.green`/`gradient.rose` + matching glow shadow
- Hover: `shadow.elevation.elevated`, `gradient.glow`

#### Voorbeeld

```tsx
import { CourseCard } from "@/components/dashboard/course-card";

<CourseCard
  course={{ id: "abc", name: "Latijn Basis" }}
  wordCount={120}
  chapterCount={6}
  wordsLearned={45}
/>
```

---

### DailyTipCard

**Bestand:** `src/components/dashboard/daily-tip-card.tsx`
**Beschrijving:** Statische "Tip van de dag" kaart met paars-teal gradient achtergrond.

#### Props

Geen props. Content is hardcoded.

#### Design Tokens
- Background: `gradient.tip`
- Border: `color.border.purple`
- Badge: `color.purple.light`, `color.purple.ghost`
- Highlight: `color.primary.light`

#### Voorbeeld

```tsx
import { DailyTipCard } from "@/components/dashboard/daily-tip-card";

<DailyTipCard />
```

---

## Practice

---

### MultipleChoice

**Bestand:** `src/components/practice/multiple-choice.tsx`
**Beschrijving:** Multiple-choice vraag met 4 opties, genummerde badges, en visuele feedback (correct/fout). Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `question` | `Question` | — | Vraag object met `prompt`, `direction`, `options` |
| `onAnswer` | `(answer: string) => void` | — | Callback bij antwoord selectie |
| `disabled` | `boolean` | — | Voorkom interactie (na beantwoording) |
| `feedback` | `{ isCorrect: boolean; correctAnswer: string } \| null` | — | Feedback state (`null` = nog niet beantwoord) |

#### Design Tokens
- Option badges: ocean, teal, amber, purple
- Correct: `color.primary.default` border/bg, `animate-scale-pop`
- Fout: `color.rose.default` border/bg, `animate-shake-wrong`
- 3D effect: `border-b-4` op opties

#### Voorbeeld

```tsx
import { MultipleChoice } from "@/components/practice/multiple-choice";

<MultipleChoice
  question={currentQuestion}
  onAnswer={handleAnswer}
  disabled={!!feedback}
  feedback={feedback}
/>
```

---

### TypeAnswer

**Bestand:** `src/components/practice/type-answer.tsx`
**Beschrijving:** Typ-antwoord vraag met tekstveld en "Controleer" button. Toont correct antwoord bij fout. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `question` | `Question` | — | Vraag object met `prompt`, `direction` |
| `onAnswer` | `(answer: string) => void` | — | Callback bij submit |
| `disabled` | `boolean` | — | Voorkom interactie |
| `feedback` | `{ isCorrect: boolean; correctAnswer: string } \| null` | — | Feedback state |

#### Design Tokens
- Input: `border-b-4` 3D effect, ocean focus ring
- Correct: `color.primary.default`, `animate-scale-pop`
- Fout: `color.rose.default`, `animate-shake-wrong`
- Submit button: `Button variant="duo" size="duo"`

#### Voorbeeld

```tsx
import { TypeAnswer } from "@/components/practice/type-answer";

<TypeAnswer
  question={currentQuestion}
  onAnswer={handleAnswer}
  disabled={!!feedback}
  feedback={feedback}
/>
```

---

### FeedbackBanner

**Bestand:** `src/components/practice/feedback-banner.tsx`
**Beschrijving:** Fixed bottom banner na beantwoording met mascotte, feedback tekst, XP indicator en doorgaan-button. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `isCorrect` | `boolean` | — | Was het antwoord correct? |
| `correctAnswer` | `string` | — | Het juiste antwoord (getoond bij fout) |
| `onContinue` | `() => void` | — | Callback voor "Doorgaan" button |

#### Design Tokens
- Correct: `color.primary.default` bg/border, Mascot `celebrating`, `+10 XP` met `animate-float-up`
- Fout: `color.rose.default` bg/border, Mascot `sad`
- Button: `variant="duo"` (correct) of `variant="duo-red"` (fout)
- Animatie: `slide-in-from-bottom`

#### Voorbeeld

```tsx
import { FeedbackBanner } from "@/components/practice/feedback-banner";

<FeedbackBanner
  isCorrect={true}
  correctAnswer="domus"
  onContinue={handleNext}
/>
```

---

### PracticeProgressBar

**Bestand:** `src/components/practice/progress-bar.tsx`
**Beschrijving:** Voortgangsbalk voor oefensessie met close button, hero gradient fill, teller en per-vraag result dots. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `current` | `number` | — | Huidige vraag nummer |
| `total` | `number` | — | Totaal aantal vragen |
| `results` | `(boolean \| null)[]` | — | Array van resultaten per vraag (`null` = nog niet beantwoord) |

#### Design Tokens
- Progress fill: `gradient.hero`
- Shine overlay: wit-transparant lineaire gradient
- Track: `color.background.progress-track`
- Correct dot: `color.primary.default`, `animate-scale-pop`
- Fout dot: `color.rose.default`
- Onbeantwoord dot: `color.background.progress-track`

#### Voorbeeld

```tsx
import { PracticeProgressBar } from "@/components/practice/progress-bar";

<PracticeProgressBar
  current={3}
  total={10}
  results={[true, true, false, null, null, null, null, null, null, null]}
/>
```

---

### StartPracticeButton

**Bestand:** `src/components/practice/start-practice-button.tsx`
**Beschrijving:** Button die een oefensessie start via API call, vragen opslaat in sessionStorage en navigeert naar de sessie pagina. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `courseId` | `string` | — | ID van de cursus |

#### Design Tokens
- Button: `variant="duo" size="duo"` met `animate-cta-shine` glans-effect

#### Voorbeeld

```tsx
import { StartPracticeButton } from "@/components/practice/start-practice-button";

<StartPracticeButton courseId="course-123" />
```

---

## Upload

---

### PhotoUploadZone

**Bestand:** `src/components/upload/photo-upload-zone.tsx`
**Beschrijving:** Drag & drop / click-to-upload zone voor foto's. Toont preview na selectie met optie om andere foto te kiezen. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `onFileSelect` | `(file: File) => void` | — | Callback wanneer een bestand geselecteerd wordt |
| `preview` | `string \| null` | — | Data URL van preview (`null` = upload zone tonen) |

#### Design Tokens
- Border: `color.border.subtle` (dashed), `color.border.hover` on hover
- Icon: `color.blue.default` (ocean), `color.blue.ghost`
- Hover: `color.primary.subtle` background

#### Voorbeeld

```tsx
import { PhotoUploadZone } from "@/components/upload/photo-upload-zone";

<PhotoUploadZone
  onFileSelect={(file) => handleUpload(file)}
  preview={previewUrl}
/>
```

---

### ExtractedWordsReview

**Bestand:** `src/components/upload/extracted-words-review.tsx`
**Beschrijving:** Bewerkbare lijst van geextraheerde woorden (Latijn/Nederlands) met mogelijkheid om woorden toe te voegen of te verwijderen. Client component.

#### Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `words` | `ExtractedWord[]` | — | Array van woord-objecten |
| `onChange` | `(words: ExtractedWord[]) => void` | — | Callback bij elke wijziging |

#### ExtractedWord Type

```ts
interface ExtractedWord {
  latin: string;
  dutch: string;
  part_of_speech: string | null;
  gender: string | null;
  extra_forms: string | null;
  difficulty: number;
}
```

#### Design Tokens
- Rij: `bg-secondary`, `color.border.default`
- Inputs: `Input` component met `bg-card`
- Verwijder: `Button variant="ghost"` met rose kleuren
- Toevoegen: `Button variant="duo-outline"`

#### Voorbeeld

```tsx
import { ExtractedWordsReview } from "@/components/upload/extracted-words-review";

<ExtractedWordsReview
  words={extractedWords}
  onChange={setExtractedWords}
/>
```

---

## Animaties (globals.css)

Veelgebruikte animaties die in meerdere componenten voorkomen:

| Animatie | Beschrijving | Gebruikt in |
|----------|-------------|-------------|
| `animate-scale-pop` | Korte scale bounce bij correct antwoord | MultipleChoice, TypeAnswer, PracticeProgressBar |
| `animate-shake-wrong` | Horizontale shake bij fout antwoord | MultipleChoice, TypeAnswer |
| `animate-float-up` | Omhoog zwevend + fade out | FeedbackBanner (+10 XP) |
| `animate-float-particle` | Verticale float + fade cycle | AmbientParticles |
| `animate-flame` | Subtiele scale puls | StreakDisplay |
| `animate-glow-pulse` | Opacity puls voor glow effecten | StreakDisplay |
| `animate-today-pulse` | Border-color puls | StreakDisplay (dag indicator) |
| `animate-cta-shine` | Horizontale glans sweep | StartPracticeButton |
