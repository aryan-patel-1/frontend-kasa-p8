<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kasa project guidelines

## Project purpose

This is an educational project

The code must be easy to read understand and explain

Prefer the simplest solution that correctly meets the requirement

Do not introduce advanced patterns only to make the code look more professional

## Language and naming

- Write folder and file names in English
- Use clear and descriptive names
- Use `kebab-case` for folders and files
- Use `PascalCase` for React component names
- Use `camelCase` for variables functions hooks and component props
- Use `UPPER_SNAKE_CASE` only for real constants
- Keep the route folders directly inside `src/app`
- Do not create route groups such as `(site)` unless explicitly requested
- Keep required Next.js filenames such as `page.tsx` `layout.tsx` `loading.tsx` and `not-found.tsx`
- French text is allowed for content displayed to the user

## Code comments

- Write comments in simple French
- Do not add punctuation at the end of comments
- Keep comments short and easy to understand
- Explain why the code exists when the reason is not obvious
- Do not describe code that is already self explanatory
- Do not leave commented out code
- Do not use comments as section decorations

Example:

```tsx
// Affiche le message si la liste est vide
```

## React and Next.js

- Use TypeScript for all source files
- Prefer Server Components
- Add `"use client"` only when the component needs state effects browser APIs or event handlers
- Keep pages small by extracting reusable interface elements into `src/components`
- Keep route specific components close to their route when they are not reused
- Prefer regular functions and readable JSX
- Avoid premature abstractions and unnecessary generic helpers
- Use the Next.js `Image` component for raster images when appropriate
- Use the Next.js `Link` component for internal navigation
- Add meaningful page metadata when creating a route

## TypeScript

- Define simple explicit types for props and data structures
- Avoid `any`
- Prefer type inference for obvious local values
- Handle optional values instead of forcing them with non null assertions
- Keep types close to the code that uses them
- Move shared domain types to `src/types`

## Styling

- Use Tailwind CSS for component styling
- Use the design tokens defined in `src/app/globals.css`
- Do not repeat Figma colors directly in multiple components
- Keep class lists readable and avoid unnecessary arbitrary values
- Build responsive layouts from mobile to desktop
- Reuse existing styles before adding new ones

## Components and data

- Give each component one clear responsibility
- Prefer props over duplicated components
- Avoid components that only wrap one HTML element without adding value
- Keep static mock data in `src/data`
- Keep reusable hooks in `src/hooks`
- Keep small reusable utilities in `src/lib`
- Do not mix data transformation with presentation when it makes the component hard to read

## Assets

- Store local assets under `public/img`
- Store large images as WebP
- Store logos and interface icons as SVG
- Organize assets by feature or usage
- Use English descriptive filenames
- Reuse one asset when the same image appears on desktop and mobile
- Add useful alternative text to meaningful images
- Use an empty alternative text for purely decorative images

## Accessibility

- Use semantic HTML elements
- Associate every form field with a label
- Give buttons a clear accessible name
- Keep keyboard navigation usable
- Do not rely only on color to communicate information
- Preserve visible focus styles

## Dependencies and complexity

- Do not install a dependency when a small native solution is enough
- Ask before adding a major library or changing the project architecture
- Avoid global state until several distant components genuinely need it
- Avoid optimization before there is a measured or visible problem
- Do not create configuration files that are not needed

## Local code explanations

- Keep `explications.md` up to date whenever code is added changed or removed
- Update `explications.md` progressively while working instead of waiting until the end
- Explain new files components routes and data flows in simple French
- Include clickable Markdown links to the relevant file paths and line numbers and keep those references accurate
- Keep the explanations organized by feature or file so they remain easy to follow
- Keep `explications.md` local and ignored by Git

## Quality checks

- Run ESLint after changing source code
- Run the relevant build or tests for risky changes
- Fix errors introduced by the current change
- Preserve existing user changes
- Remove unused imports variables files and dead code
- Check both mobile and desktop behavior for interface changes
- Explain important additions in simple terms when handing off the work
