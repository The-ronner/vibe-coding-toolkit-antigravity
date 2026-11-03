---
trigger: glob
globs: "*.md, *.md.template, *.json, *.json.example"
description: "Documentation and configuration conventions for toolkit files and generated project contracts."
---
# Documentation and configuration rules

Write canonical documentation in English; keep `README.pt-BR.md` and `README.es.md` aligned with `README.md`. Use Brazilian Portuguese only for agent-facing conversation. Keep public paths and stable identifiers in English.

For Antigravity, use `GEMINI.md` or `AGENTS.md` for always-on constraints, `.agents/rules/*.md` for triggered rules with valid YAML frontmatter, `.agents/skills/<name>/SKILL.md` for reusable workflows, and `.agents/mcp_config.json` for project MCP configuration. Do not create deprecated workflow files as the primary implementation.

Generated project documents must remain mapped by `templates/project-docs/manifest.json`. Do not use placeholders or describe planned capabilities as completed. Validate relative links, anchors, JSON, frontmatter, and generated destinations after edits.
