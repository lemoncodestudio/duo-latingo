## Design System

This project uses a strict design system. When building or modifying UI, always follow these rules:

- **Never** use hardcoded colors, spacing, font sizes, border radius, or shadows
- **Always** use tokens from `tokens.json` via the CSS variables or token references
- **Always** use existing components from `/components` before creating new ones
- Consult `COMPONENTS.md` for available components, their props, and usage examples
- When a new component is needed, follow the patterns and token usage of existing components
- New components must be added to `COMPONENTS.md` after creation

When building a new page or feature, start by checking:
1. Which components from `COMPONENTS.md` can be reused?
2. Are all visual values covered by existing tokens?
3. If a token is missing, add it to `tokens.json` first, then use it
