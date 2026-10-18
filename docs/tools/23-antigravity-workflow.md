# Antigravity: instructions, skills, MCP, and hooks

Google Antigravity is an agent-first development environment with three surfaces: the **App**, the **CLI** (`agy`), and the **IDE**. This guide explains how to use the toolkit with `AGENTS.md`, skills, MCP servers, hooks, and subagents in Antigravity. For Codex, use the [Codex guide](15-codex-workflow.md); for the narrated Claude Code workflow, use the [playbook](../02-playbook-onboarding.md); to prepare the whole computer, use [environment setup](../03-environment-setup.md).

To configure or update the applicable toolkit in an existing project, use [prompt 12](../prompts/12-existing-project-setup.md) or its Antigravity-oriented staged variant, [prompt 15](../prompts/15-antigravity-existing-project-setup.md).

For a plain-language walkthrough for non-programmers (in Portuguese), see the [beginner guide](../antigravity-beginners.pt-BR.md).

References checked on **October 17, 2026**. Antigravity changes quickly: surfaces, paths, and model lists have already moved. Consult the sources again before installing or migrating. Where sources disagree, this guide says so instead of choosing silently.

## Evidence level

This guide is documentation work. The toolkit's [validation report](../05-toolkit-validation.md) does **not** include an Antigravity run: no skill discovery, hook execution, MCP response, or subagent dispatch was observed in Antigravity by this repository. Treat every path below as "documented by the vendor" until you verify it in a new session using the [validation list](#validate-without-relying-on-the-old-session).

## Where things live

Antigravity reads project configuration from `.agents/` (the singular `.agent/` still works for older projects). Global configuration lives under `~/.gemini/`, and the exact subdirectory depends on the surface.

| Capability | Project scope | Global scope |
|---|---|---|
| Instructions | `AGENTS.md` or `GEMINI.md` in any directory up to the workspace root; `.agents/rules/*.md` | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, or the same names under `~/.gemini/config/` |
| Skills | `.agents/skills/<name>/SKILL.md` | App and IDE: `~/.gemini/config/skills/<name>/`; CLI: `~/.gemini/antigravity-cli/skills/<name>/` |
| MCP servers | `.agents/mcp_config.json` | `~/.gemini/config/mcp_config.json` |
| Hooks | `.agents/hooks.json` | `~/.gemini/config/hooks.json` |
| Custom subagents | `.agents/agents/<name>.md` or `.agents/agents/<name>/agent.md` | `~/.gemini/config/agents/` |

Sources: [rules](https://antigravity.google/docs/rules/), [skills](https://antigravity.google/docs/skills/), [MCP](https://antigravity.google/docs/mcp/), [subagents](https://antigravity.google/docs/subagents/), and [hooks](https://www.antigravity.google/docs/hooks?tab=ide). The skills page also lists a legacy global path, `~/.gemini/antigravity/skills/`, for the IDE.

Codex also discovers project skills in `.agents/skills/`. A project skill installed there is visible to both clients, so do not install a second copy for Antigravity.

## Use `AGENTS.md` for project instructions

Antigravity checks each folder from the file being edited up to the workspace root for `AGENTS.md` or `GEMINI.md`, and for `.agents/AGENTS.md`. Rules are cumulative: global, workspace, and directory rules combine, and the more specific directory wins on a conflict. A secondary guide reports that `AGENTS.md` support arrived in IDE version 1.20.5 and that earlier versions read only `GEMINI.md`; the official page does not give a version, so check your installation.

Use the [shared template](../../templates/AGENTS.md.template) to create `AGENTS.md` in the target project, merging with existing instructions. Three details matter:

- **Do not create both `AGENTS.md` and `GEMINI.md` in the same folder.** The documentation does not say which one wins when both exist. Keep `AGENTS.md` as the single portable file; use `GEMINI.md` only when a project already depends on it, and then avoid duplicating content.
- **Mind the size.** The official page says files over 24,000 bytes are truncated, and that global and always-on rules share a 20,000-token budget; when it is exceeded, the largest files are reduced to pointers. A secondary guide cites a stricter 12,000-character limit for a rules file. The unfilled shared template is already close to 12,000 characters, so remove sections for capabilities the project does not adopt and keep details in `docs/`.
- **`.agents/rules/*.md` are different.** Each file there must start with YAML frontmatter declaring a valid `trigger` (`always_on`, `model_decision`, `glob`, or `manual`); a file without one is silently discarded. `AGENTS.md` and `GEMINI.md` take no frontmatter. Only the immediate `.md` files of `.agents/rules/` are read.

`CLAUDE.md` is a Claude Code file and is not among the names Antigravity documents. Its `@AGENTS.md` import is Claude syntax; do not assume Antigravity interprets it. Keep personal paths and credentials in user configuration, outside the shared template.

## Skills replace workflows

Antigravity moved from single-file workflows to [Agent Skills](https://antigravity.google/docs/migration/workflows-to-skills/), an open standard. The documentation states that legacy workflows (`.agents/workflows/<name>.md`) stop working on **October 19, 2026**. Do not add workflows. If a project has them, run `/migrate-workflows` in the App, or move each file to `.agents/skills/<name>/SKILL.md` and add `name` and `description` frontmatter.

A skill is a folder with a required `SKILL.md`, plus optional `scripts/`, `examples/`, and `resources/`. The `description` is required: the agent reads only each skill's name and description at the start of a conversation and loads the body when the task matches. In the App you can also type `/<skill-name>`; in the CLI each skill becomes a slash command. If a skill and a workflow share a name, the skill wins.

Install catalog skills with the same CLI the rest of the toolkit uses. Antigravity has its own agent identifier:

```bash
npx --yes skills@latest add vercel-labs/skills --skill find-skills --agent antigravity --yes
npx --yes skills@latest list --agent antigravity
```

The [skills CLI documentation](https://cdn.jsdelivr.net/gh/vercel-labs/skills@main/README.md) lists `antigravity` with project path `.agents/skills/` and global path `~/.gemini/antigravity/skills/`. That global path is the legacy one in Antigravity's own docs, so prefer project scope. To use Claude Code, Codex, and Antigravity together, pass all three identifiers once. See the [Vercel catalog](16-vercel-skills.md) for the skill list and Windows copy mode.

Ask the agent to list discovered skills and their origin before validation. A directory on disk without a discovered skill is an incomplete setup.

## Connect MCP servers

Antigravity reads MCP servers from `mcp_config.json`. The file has one top-level `mcpServers` object, and each server needs either `command` (local process) or `serverUrl` (remote Streamable HTTP or SSE server). Remote servers **must** use `serverUrl`: the legacy fields `url` and `httpUrl` are not supported, and `type` is not among the documented fields.

This means the [Claude `.mcp.json` template](../../templates/project/mcp.json.example) and the [Codex TOML template](../../templates/project/codex.config.toml.example) cannot be copied into Antigravity. Use the dedicated [Antigravity template](../../templates/project/antigravity.mcp_config.json.example), which is also a valid starting point for other remote servers.

In the App, open Settings, then Customizations, then Installed MCP Servers; in the CLI, use `/mcp`; in the IDE, use the agent panel's menu and **View raw config**. Prefer project scope (`.agents/mcp_config.json`) when the server belongs to one project, and reuse a global entry that already provides the same server.

### Context7

Antigravity's MCP documentation does not mention Context7 at the time of checking, so add it manually. The [Context7 client documentation](https://context7.com/docs/resources/all-clients) gives a remote option and a local option:

```json
{
  "mcpServers": {
    "context7": {
      "serverUrl": "https://mcp.context7.com/mcp"
    }
  }
}
```

If the service limits anonymous access, add the authentication the Context7 page documents for Antigravity and keep the key outside the repository. The sources checked disagree on the header name: the client page shows `Authorization: Bearer <key>`, while a maintainer comment in [issue 1043](https://github.com/upstash/context7/issues/1043) shows `CONTEXT7_API_KEY`. Follow the current Context7 page, then confirm with a real query. A listed server proves registration, not a response. See [Context7](12-context7.md) for the lookup workflow.

### Other servers

[Chrome DevTools MCP](14-chrome-devtools-mcp.md) and [Sentry MCP](22-sentry-mcp.md) are remote or local MCP servers and can use the same `mcp_config.json` shape, translating `url` to `serverUrl`. The OAuth flow for Sentry in Antigravity was not verified; complete authentication through the supported UI and keep tokens out of versioned files. Antigravity also ships a built-in browser subagent, invoked with `/browser`; check it before installing a separate browser tool.

## Integrate RTK

[RTK documents native Antigravity support](https://www.rtk-ai.app/docs/getting-started/supported-agents/). After installing the binary and backing up existing configuration:

```bash
# Workspace scope
rtk init --agent antigravity

# Machine scope
rtk init -g --agent antigravity
```

The integration is a plugin at `<repo>/.agents/plugins/rtk/` or `~/.gemini/config/plugins/rtk/`. It maps a `PreToolUse` hook on `run_command` to `rtk hook antigravity`, which rewrites the command before it runs, and adds an awareness rule in `rules/AGENTS.md`. Antigravity checks permissions **after** the rewrite, so a command allowlist must include `rtk`, for example `command(rtk *)`.

Choose one scope: do not register the same hook in workspace and machine scope without checking the combined effect. Open a new session and confirm that a supported command is rewritten once. Without an active hook, use `rtk git status`; for complete output, use `rtk proxy <command>`. More details: [RTK](03-rtk-token-proxy.md).

## Hooks

Antigravity supports hooks in `.agents/hooks.json` or `~/.gemini/config/hooks.json`. The documented events are `SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, and `Stop`. Each handler is a shell `command` with a `timeout` (default 30 seconds). Input arrives as camelCase JSON on stdin, and output is JSON on stdout. A `PreToolUse` handler must return a `decision` (`allow`, `auto_approve`, `deny`, `ask`, `force_ask`, or `deny_unless_prior_grant`) and may rewrite tool arguments. A `Stop` handler can keep the loop running.

This differs from the Claude Code format used by [`settings.json.example`](../../templates/settings.json.example) and [`hook-io.mjs.example`](../../templates/hooks/hook-io.mjs.example): different file, event names, JSON shape, and exit-code conventions. Do not copy those examples as Antigravity configuration. The [hook best practices](10-hooks-best-practices.md) about failing open and parsing input safely still apply. Because `Stop` and `PostInvocation` can prevent an agent from finishing, test any hook in a disposable project first. These hooks are not Git hooks, and this toolkit does not add commit, push, or branch blockers.

## Superpowers

The toolkit's [Superpowers guide](01-superpowers.md) describes the official distribution. At the time of checking, no official Antigravity distribution was found. A community port exists, announced on the [Google AI developer forum](https://discuss.ai.google.dev/t/superpowers-port-for-antigravity-2-0-ide-cli/168112); it is a port by an independent author, not published by the original project. Its documented installation clones a repository into `~/.gemini/config/plugins/superpowers`. The thread also reports crashes, stuck sessions, and an edit-time hook that blocked writes on some machines before it was made opt-in.

Review third-party skills and hooks before installing, because they run with the agent's permissions. If you choose not to install the port, the working agreements in [`AGENTS.md`](../../templates/AGENTS.md.template) and the [brainstorm-to-plan prompt](../prompts/04-brainstorm-to-plan.md) provide the same proportional process without extra software. Record the decision and the limitation in `docs/setup.md`.

## Subagents and model choice

Antigravity supports custom subagents defined as Markdown files with YAML frontmatter; the text after the frontmatter is the system prompt. Documented fields include `name` and `description` (both required), `tools`, `model`, `commandExecutionPolicy`, `mcpServers`, and `skills`. The `model` field accepts `inherit` (default), `flash`, or `pro`, which maps directly to the toolkit's [model-selection discipline](02-subagent-orchestration.md#part-b--model-selection-discipline): lightweight capability for searches, inventories, and mechanical changes; more capability for architecture, security, data, and critical review. The parent starts a subagent with a fresh context, so the briefing must carry the objective, files, acceptance criteria, and checks.

Built-in subagents include `research`, `browser`, and `self`. Parents can run several subagents concurrently, and nesting is limited to 10 levels. The workspace option `branch` isolates a subagent in a Git worktree; it is an option, not a toolkit requirement.

Without an authorized selection policy, subagents use the session model, as in every client. Do not hardcode a model name, provider, or plan in shared instructions: the model selector lists several providers and changes by plan. The [models page](https://antigravity.google/docs/models/) states that the chosen model persists within a conversation, but does not say whether a subagent can override it beyond the tier field above. Delegation specifics came from the [subagents page](https://antigravity.google/docs/subagents/); check the installed version before relying on them.

## Graphify

[Graphify](07-graphify.md) installs with `uv tool install graphifyy` and `graphify install`, which detects an assistant. Graphify's [Antigravity page](https://graphify.com/integrations/google-antigravity) states that the graph is exposed through an MCP server. Its installation guide does not list Antigravity as an explicit `--platform` value, and no Antigravity-specific files or paths were confirmed. Check discovery in a new session; if it is missing, register the Graphify MCP server in `mcp_config.json` using the launch command from Graphify's own documentation, and install the `graphifyy[mcp]` extra when it requires one.

The same limits apply as in other clients: preserve the session's authorized client, model, and authentication; the `graphify extract` CLI does not inherit the conversation's login; without a compatible native semantic integration, record the limitation and use deterministic extraction. The [exclusions template](../../templates/project/.graphifyignore.example) already excludes `.agents/`, `.agent/`, and `.gemini/`.

## Permissions

Antigravity has its own permission and command-execution policies: the [permissions page](https://www.antigravity.google/docs/permissions) and the subagent `commandExecutionPolicy` field (`off`, `auto`, `eager`, or `sandbox`, with `sandbox` as the default). They were not reviewed in detail for this guide. Check the effective policy in a new session, because a setting changed in one surface (App, CLI, or IDE) does not prove the others. Do not weaken permissions to make a check pass, and do not enable broad approval except in the authorized context of the requested setup. Organization policies and operating-system permissions can limit the result.

## Work continuity

Adopt the [execution continuity agreements](../02-playbook-onboarding.md#execution-continuity) and the block in the [shared AGENTS template](../../templates/AGENTS.md.template). Status questions do not end authorized work; blockers affect only dependent work. Confirm a subagent has stopped before taking over its files, check the checkout when resuming, and preserve permissions and limits. These instructions do not guarantee execution after the turn.

## What does not carry over

- Claude plugin commands (`/plugin ...`), `.claude/settings.json`, and Claude hook scripts.
- Codex commands (`codex plugin ...`, `codex mcp add ...`), `.codex/config.toml`, and `$name` skill invocation.
- Claude and Codex MCP syntax (`type`/`url`, TOML tables).
- The `gh-fix-ci` skill, which targets the Codex workflow ([guide](19-github-ci-repair.md)); verify a client's tools before adopting it.

## Validate without relying on the old session

- Open a new App, CLI, or IDE session; check the version, authentication, and the model shown in the selector.
- Confirm which instruction files were loaded and that only one of `AGENTS.md` and `GEMINI.md` exists per folder.
- List discovered skills and use one for a small task without publishing or paid test calls.
- Run a real Context7 query and check the result.
- Check one RTK command execution without duplication, and complete output through `rtk proxy`.
- Verify Graphify discovery without starting paid semantic extraction.
- Confirm no `.agents/workflows/` files remain.
- Record outstanding hooks, login, permissions, or policy issues; do not treat files on disk as validation.
