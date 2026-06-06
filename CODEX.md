@AGENTS.md

# CODEX.md

## Philosophy

Write code as if it will be maintained by another engineer six months from now.

Prioritize:

- Readability
- Simplicity
- Maintainability
- Type safety
- Accessibility

Avoid unnecessary abstractions and premature optimization.

---

## General Rules

- Prefer simple solutions.
- Prefer explicit code over clever code.
- Avoid over-engineering.
- Avoid unnecessary dependencies.
- Do not introduce patterns that are not justified by current requirements.
- Every abstraction must solve a real problem.

---

## TypeScript

### Required

- Use strict TypeScript.
- Never use `any`.
- Prefer interfaces for object shapes.
- Use discriminated unions when appropriate.
- Export shared types from dedicated type files.

### Avoid

- Excessive generic complexity.
- Type assertions unless absolutely necessary.
- Loosely typed objects.

---

## React

### Components

- Use functional components only.
- Prefer named exports.
- Keep components focused on a single responsibility.
- Keep components small and composable.

### Server Components

- Prefer Server Components by default.
- Add `"use client"` only when required.
- Do not convert entire trees into Client Components unnecessarily.

### State

- Keep state as local as possible.
- Lift state only when required.
- Do not introduce global state without a clear reason.

---

## Component Design

Before creating a component ask:

1. Is it reused?
2. Does it reduce duplication?
3. Does it improve readability?

If not, keep the code where it is.

Avoid component explosion.

Bad:

```tsx
<Header>
  <HeaderTitle />
  <HeaderActions />
  <HeaderButton />
</Header>
```

Good:

```tsx
<Header />
```

unless reuse genuinely exists.

---

## Custom Hooks

Create a custom hook only if:

- Logic is reused
- Extraction improves readability

Do not create hooks for simple state management used once.

---

## Utilities

Create utility functions only when:

- Logic is shared
- Logic is sufficiently complex

Avoid utility files full of one-line wrappers.

---

## File Structure

Organize code by feature when practical.

Prefer:

```txt
components/
  dashboard/
  modal/
  shared/
```

over:

```txt
components/
  buttons/
  cards/
  tables/
  inputs/
```

when building feature-oriented applications.

---

## Data Flow

- Keep data flow predictable.
- Pass only required props.
- Avoid deeply nested prop chains.
- Avoid unnecessary context providers.

---

## Styling

- Use Tailwind CSS.
- Prefer utility classes over custom CSS.
- Avoid inline styles.
- Avoid arbitrary values unless necessary.
- Keep styling colocated with components.

---

## Accessibility

Always:

- Use semantic HTML.
- Use proper button elements.
- Use proper form labels.
- Ensure keyboard accessibility.
- Add ARIA attributes where needed.

Accessibility is not optional.

---

## Performance

Do not optimize prematurely.

Avoid unnecessary:

- useMemo
- useCallback
- memo

Only optimize when there is a measurable reason.

---

## Naming

Use descriptive names.

Good:

```ts
isModalOpen;
selectedFilter;
gridItems;
```

Bad:

```ts
flag;
data;
item1;
temp;
```

---

## Code Quality

Always:

- Remove unused imports.
- Remove dead code.
- Avoid duplication.
- Avoid magic numbers.
- Handle empty states.
- Handle loading states where appropriate.

Generated code must compile successfully without placeholder implementations.

---

## Decision Framework

When multiple solutions exist:

1. Choose the simplest solution.
2. Choose the most maintainable solution.
3. Choose the most readable solution.
4. Choose the solution with the fewest abstractions.

Optimize for long-term maintainability rather than short-term cleverness.
