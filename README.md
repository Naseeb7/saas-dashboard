# Bitscale SaaS Dashboard

A frontend engineering assignment built with Next.js App Router, TypeScript, Tailwind CSS v4, and Lucide React. The project focuses on clean architecture, reusable UI primitives, responsive layout behavior, accessibility, and configuration-driven rendering.

## Overview

This application implements two primary experiences:

- A dashboard page with sidebar navigation, header, summary cards, search controls, and a data grid
- A reusable "Find People" modal with filters, results preview, and empty-state handling

The implementation is intentionally structured so the visual layer can be iterated independently from the application architecture.

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Lucide React

## Key Decisions

### Server-first composition

The route and most dashboard sections are implemented as Server Components by default. Client boundaries are used only where interaction is required, such as:

- Modal open/close state
- Accordion filter behavior
- Sidebar interaction on desktop and mobile
- Grid toolbar interactions

### Feature-based organization

The codebase is grouped by responsibility instead of by technical layer. This keeps the dashboard, modal, layout, shared primitives, and mock data isolated and easier to maintain.

### Configuration-driven rendering

Several parts of the UI are rendered from data and config files rather than hardcoded JSX:

- Navigation items
- Grid rows
- Filter sections
- Modal preview data

This keeps the assignment scalable and easier to extend without rewriting component structure.

### Reusable primitives

The project includes shared primitives that are reused across the dashboard and modal:

- `Button`
- `Table`
- `Modal`

These components are intentionally small and explicit, with minimal abstractions.

## Responsive Behavior

The layout is built for multiple viewports:

- Desktop: full dashboard with sidebar, header, cards, toolbar, grid, and modal overlay
- Tablet: collapsed sidebar rail and stacked/adjusted content where needed
- Mobile: hamburger-triggered navigation drawer and stacked modal/body layout

Responsive behavior is kept structural, not decorative.

## Accessibility

Accessibility was treated as a first-class requirement:

- Semantic landmarks and headings
- Proper button semantics
- Accessible dialog structure
- Escape-to-close support for the modal
- Click-outside-to-close support for the modal
- Keyboard-friendly accordion controls
- Form labels and ARIA attributes where appropriate

## Project Structure

```txt
app/
  layout.tsx
  page.tsx

components/
  layout/
  dashboard/
  modal/
  shared/

data/
  navigation.ts
  grid-items.ts
  filters.ts
  users.ts

types/
  navigation.ts
  grid.ts
  filters.ts
  user.ts

lib/
  utils.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app at:

```bash
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run start
```

## Implementation Notes

- The project uses mock data only.
- No external API integration is required for the assignment.
- Visual styling is intentionally kept modular so final polish can be adjusted without changing the structure.
- Tailwind v4 semantic color tokens are defined in `app/globals.css`.

## Submission Notes

This repository is organized to demonstrate:

- Scalable component composition
- Strong TypeScript usage
- Reusable UI primitives
- Responsive layout behavior
- Accessibility-conscious implementation
- Maintainable assignment-ready structure

