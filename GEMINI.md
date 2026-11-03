@AGENTS.md

## Google Antigravity

This repository is optimized for Google Antigravity. Use the workspace skills in `.agents/skills/` for multi-step setup and review workflows, and load `.agents/rules/` rules according to their triggers. Keep `AGENTS.md` as the shared, client-neutral contract; do not duplicate its policies here.

- Prefer Agent Skills (`SKILL.md`) over legacy workflows. Antigravity workflows are deprecated in this repository's supported date range.
- Use `.agents/mcp_config.json` only for project-scoped MCP servers. Never commit tokens, OAuth secrets, or private endpoints.
- Treat installed, discovered, configured, authenticated, and successfully exercised as separate states; record evidence in `docs/setup.md`.
- Use `/vibe-bootstrap`, `/vibe-existing-project`, `/vibe-security-review`, and `/vibe-harness-evaluation` when the corresponding skill is available.
