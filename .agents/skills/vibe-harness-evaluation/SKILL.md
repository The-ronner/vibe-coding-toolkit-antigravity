---
name: vibe-harness-evaluation
description: Evaluates and improves agent instructions, rules, skills, recovery, and verification loops with disposable deterministic cases. Use after changing an AI coding harness or when checking whether project guidance is discoverable and safe.
---
# Vibe harness evaluation

Read `docs/07-harness-evaluation.md`, `docs/prompts/14-harness-evaluation.md`, and `docs/prompts/15-harness-improvement.md`. Use a disposable fixture or temporary copy and preserve the original repository. Test only the requested scope: authorization boundaries, complete fixes, stale handoffs, customization preservation, recovery, and relevant validation.

Distinguish observed behavior from installed files, agent self-reports, and unavailable host interactions. Do not change permissions, add hooks, install a new orchestrator, switch providers, or enable billing. If a candidate improvement is needed, compare at most one minimal change under the same checks, then keep or revert it based on evidence.

Record cases, commands, results, limits, and the reusable invocation in the project's canonical quality/setup documents. Never claim fresh-session discovery or external MCP execution without observing it.
