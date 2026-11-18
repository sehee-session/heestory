# Architecture Rules

## Feature-Sliced Design

Follow Feature-Sliced Design (FSD) architecture when creating or modifying code.

### Layer Rules

Use the following layer hierarchy:

- app
- pages
- widgets
- features
- entities
- shared

Import dependencies only from the same layer or lower layers. Never import from a higher layer.

### Import Rules

- Import modules from other slices through their public API (`index.ts`).
- Do not import another slice's internal files directly.
- Avoid deep imports across slices.
- Keep imports within the same slice unrestricted when necessary.
- Place reusable UI components, utilities, and shared logic in `shared`.

### Code Generation

- Before creating a file, inspect the existing project structure.
- Follow existing naming and directory conventions.
- Do not introduce a new architectural pattern without a good reason.
- Prefer reusing existing modules over duplicating functionality.
- Ensure all imports follow FSD dependency rules.
