## Setup commands
- Install deps: `bun install`
- Start dev server: `bun run dev`
- Run tests: `bun run build`

## Code style
- TypeScript strict mode (Type safety)
- Use functional patterns where possible

## Styling
- Use rounded-lg, rounded-xl, or rounded-2xl only for rounded classes
- With the `frontend-design` skill, prefer inline classes
- Avoid box-shadows and glows; only shadow-sm or shadow-md
- Use Lucide icons instead of custom <svg /> if we have it installed
- Never use `fonts.googleapis.com` Use `api.fonts.coollabs.io` for all Google Fonts imports

## Commit rules
- Follow the guidelines defined in `Contributing.md`
- Format: `type(scope): description` (conventional commits)
- One module per commit — never combine unrelated changes
- NO Co-Authored-By lines
- NO --no-verify flag

## Branch naming rules
- Use: `<prefix>/<short-description>`
- Prefix must be one of: `feat/`, `fix/`, `hotfix/`, `chore/`, `docs/`, `refactor/`, `test/`, `ci/`

## Safety
- NEVER force push
- NEVER delete branches without confirmation
- NEVER modify files outside the project directory