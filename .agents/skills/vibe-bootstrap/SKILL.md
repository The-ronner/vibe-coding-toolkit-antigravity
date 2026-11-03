---
name: vibe-bootstrap
description: Bootstraps a new application from a product description using the Vibe Coding Toolkit. Use when starting a new project, creating a Next.js foundation, generating PRODUCT.md and project docs, or configuring a fresh codebase with Antigravity.
---
# Vibe bootstrap

Use this skill when the user wants to start a product or create a new application from an idea.

## Procedure

1. Read `docs/prompts/11-next-project-bootstrap.md`, `docs/04-project-bootstrap.md`, `docs/06-project-defaults.md`, `docs/tools/README.md`, and `templates/README.md` from this checkout. Use the same revision for all files.
2. Inspect the destination directory, existing instructions, runtime, package manager, Git state, and user authorization. If the destination is this toolkit, create or use a sibling application directory instead.
3. Define the product in `PRODUCT.md`, preserve existing contracts, and use the manifest in `templates/project-docs/manifest.json` to generate the canonical documentation.
4. For Antigravity, create or reconcile `AGENTS.md`, `GEMINI.md`, `.agents/rules/`, `.agents/skills/`, and `.agents/mcp_config.json` only when needed. Use relative links or copies for project skills and do not copy this entire repository into the application.
5. Configure only applicable stack, skills, MCP servers, and checks. Never add credentials, account-dependent services, deployment, Git hooks, or application features without authorization.
6. Run relevant checks and record actual versions, sources, discovery, execution evidence, limitations, and the next MVP task in `docs/setup.md` and `docs/quality.md`.

## Antigravity conventions

`AGENTS.md` and `GEMINI.md` are always-on instruction files. Detailed procedures belong in skills so they load on demand. Use `.agents/skills/<name>/SKILL.md` with YAML `name` and `description`; keep each skill focused and include scripts or references only when they are self-contained. Use `.agents/mcp_config.json` with an `mcpServers` object and one transport per server. Keep the example in version control, but keep real tokens and OAuth state outside the repository.

## Completion criteria

The destination has a coherent foundation, no invented checks or results, valid Antigravity discovery files, documented client decisions, and passing relevant validation. Publishing and the full product implementation remain outside this bootstrap.
