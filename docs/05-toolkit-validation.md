# Validate the toolkit

The toolkit keeps no application or Next.js dependencies at the root. Validate documents, templates, and Antigravity discovery files in a separate environment:

```bash
node --test scripts/validate-docs.test.mjs
node --test scripts/validate-harness.test.mjs
node scripts/validate-docs.mjs
node scripts/validate-antigravity.mjs
node scripts/validate-next.mjs
```

Use Node.js 24, npm, Git, and network access. The document check verifies local links, image `srcset` candidates, anchors, manifest destinations, JSON, and this repository’s GitHub/raw URLs, including shortcuts inside prompts. `validate-antigravity.mjs` checks the native bridge, rule frontmatter/triggers, skill manifests and size limits, and the MCP transport schema. The application check creates and removes a temporary project; dependencies and test resources stay there. Neither check calls models, installs Git hooks, or changes global configuration.

The [workflow](../.github/workflows/validate.yml) runs these checks on Ubuntu and Windows, with official actions pinned by commit and read-only permissions. Public names are part of the contract: update callers, indexes, and templates in the same change.

## What validation proves

| Check | Evidence |
|---|---|
| Documentation | Nine manifest sources/destinations and destination-relative links |
| Antigravity | `GEMINI.md`, triggered rules, focused skills, and a valid MCP example |
| Skills | Explicit fixture selections from the Vercel, Next.js, Supabase, OpenAI, Trail of Bits, and shadcn sources; frontmatter names, lockfile, and client content |
| ESLint | Full, lightweight, and advanced profiles load |
| Server | Environment, log redaction, and pool lifecycle tests |
| SQL | Drizzle Kit generation and embedded CRUD/rollback |
| Application | Lint, types, self-checks, tests, build, and production HTTP |
| Dependencies | Production and development audit evidence |
| Cleanup | Temporary resources removed |
| Harness evaluator | Authorization, complete-fix, and customization-preservation cases |

Skill presence or valid local configuration does not prove host discovery, authentication, external service access, or a successful live workflow. Those require a fresh Antigravity session and must be recorded separately.
