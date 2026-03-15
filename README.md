# Bill Splitter

## Style Guide

### CSS Variables

The application uses CSS custom properties defined in `app/globals.css` with automatic light/dark mode support via `prefers-color-scheme`.

#### Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-primary` | `#e9b935` | `#e9b935` | Primary accent color |
| `--color-primary-dark` | `#e9b9352f` | `#e9b9352f` | Dark variant of primary |
| `--color-bg-primary` | `#fff9ea` | `#110a04` | Main background |
| `--color-bg-secondary` | `#f5f5f5` | `#1d1d1d` | Secondary background (e.g., cards, modals) |
| `--color-bg-tertiary` | `#e5e5e5` | `#313131` | Tertiary background |
| `--color-text-primary` | `#1a1a1a` | `#ffffff` | Main text |
| `--color-text-secondary` | `#6d6d6d` | `#919191` | Secondary text |
| `--color-text-tertiary` | `#919191` | `#6d6d6d` | Muted text |
| `--color-border-primary` | `#d4d4d4` | `#383838` | Primary borders |
| `--color-border-secondary` | `#a3a3a3` | `#6D6D6D` | Secondary borders |

#### Layout

| Variable | Value | Usage |
|----------|-------|-------|
| `--border-radius` | `16px` | Default border radius |