# Google Antigravity

Google Antigravity discovers persistent rules, on-demand Agent Skills, and MCP servers from the workspace. This toolkit uses those native surfaces while retaining `AGENTS.md` as the shared contract.

For a longer, step-by-step walkthrough of the App, CLI, and IDE surfaces (RTK, hooks, subagents, permissions, and migration details), see the [Antigravity workflow guide](25-antigravity-workflow.md). Non-technical readers can start with the [Portuguese beginner guide](../antigravity-beginners.pt-BR.md).

## Repository layout

```text
GEMINI.md                         Antigravity bridge to shared instructions
.agents/
├── rules/                        triggered rules with YAML frontmatter
├── skills/<name>/SKILL.md        focused procedures loaded on demand
└── mcp_config.json               project MCP configuration, when needed
templates/GEMINI.md.template      generated project bridge
templates/antigravity/            generated skill template
```

`AGENTS.md` and `GEMINI.md` are always-on files. Rules under `.agents/rules/` require frontmatter with `trigger: always_on`, `model_decision`, `glob`, or `manual`. A `model_decision` rule must include `description`; a `glob` rule must include `globs` or `glob`. Antigravity scans immediate Markdown files in that directory, so do not hide rules in nested folders unless registering them through `.agents/rules.json`.

A skill is a directory with a `SKILL.md` whose frontmatter includes a descriptive `description`; `name` is recommended. Keep the body focused and place scripts or references beside it. Skills are discovered from `.agents/skills/` and may be invoked with `/skill-name`. The old `.agent/skills` path remains a compatibility fallback, but new output uses `.agents/skills`.

MCP uses `.agents/mcp_config.json` with an `mcpServers` object. A local server uses `command` and optional `args`, `env`, and `cwd`; a remote Streamable HTTP server uses `serverUrl` (or `url`) and optional `headers`, OAuth, or Google credentials. Configure allowlists with `enabledTools` where practical. Examples contain no tokens. Real OAuth state and credentials stay outside Git.

## Migration policy

Use Agent Skills for reusable multi-step work. Do not add legacy Antigravity workflow files as the primary implementation because the official IDE documentation announces their retirement on October 19, 2026. Existing workflow content should be moved into a focused skill and invoked with `/skill-name`.

The toolkit ships `vibe-bootstrap`, `vibe-existing-project`, `vibe-security-review`, and `vibe-harness-evaluation`. Add project-specific skills only when the project has a concrete repeated procedure. Do not turn every document into a skill; rules capture invariants and skills capture procedures.

## Verification

Check frontmatter and directory placement in a fresh Antigravity session. Treat file presence, discovery, authentication, and a successful live tool call as separate evidence. Record the client surface, version, scope, source revision, checks, unavailable capabilities, and update method in `docs/setup.md`.

## Official references

- [Rules](https://antigravity.google/docs/rules/)
- [Agent skills](https://antigravity.google/docs/skills/)
- [MCP](https://antigravity.google/docs/mcp/)
- [IDE workflows and migration notice](https://antigravity.google/docs/ide/workflows/)
- [Authoring Google Antigravity Skills](https://codelabs.developers.google.com/getting-started-with-antigravity-skills)
