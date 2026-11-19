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

## Commit Message Rules

Commit messages must follow this format:

`<prefix>: <description> #<issue-number>`

### Prefix Rules

| Prefix             | Description                   |
| ------------------ | ----------------------------- |
| `feat`             | Add a new feature             |
| `fix`              | Fix a bug                     |
| `design`           | UI or visual design changes   |
| `!breaking change` | Major API changes             |
| `!hotfix`          | Urgent bug fixes              |
| `style`            | Code formatting changes       |
| `refactor`         | Refactor existing code        |
| `comment`          | Add or update comments        |
| `docs`             | Documentation changes         |
| `test`             | Add or update tests           |
| `chore`            | Package manager configuration |
| `rename`           | Rename files or directories   |
| `remove`           | Delete files or directories   |

### Writing Rules

- Choose a prefix from the list above.
- Write commit descriptions concisely in English.
- Always include the issue number in the `#number` format.
- Never invent an issue number. Ask the user if the issue number is unknown.
- If multiple changes are included, choose the prefix that best represents the primary change.
- Do not deviate from this format.

### Examples

- `feat: Add GitHub login functionality #12`
- `fix: Fix OAuth redirect issue #15`
- `design: Update login page layout #18`
- `!breaking change: Restructure authentication API #20`
- `!hotfix: Fix session expiration issue #21`
- `style: Format button styles #22`
- `refactor: Separate authentication logic #23`
- `comment: Add authentication comments #24`
- `docs: Write project setup guide #25`
- `test: Add login functionality tests #26`
- `chore: Update package manager configuration #27`
- `rename: Rename authentication files #28`
- `remove: Delete unused components #29`
