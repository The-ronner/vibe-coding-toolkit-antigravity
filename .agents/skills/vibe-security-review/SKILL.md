---
name: vibe-security-review
description: Performs a read-only, evidence-based security review of a repository or diff with private reporting and explicit limits. Use for security audits, trust-boundary review, vulnerability triage, or pre-release security checks.
---
# Vibe security review

Read `docs/prompts/13-security-review.md` and `docs/tools/20-security-review.md`. Default to read-only repository or diff mode. Inspect the requested range, dependencies, scripts, hooks, configuration, trust boundaries, authentication, authorization, input validation, secrets handling, logging, and data flows.

Run only understood, non-destructive checks with synthetic data. Never load real environment secrets, mutate external services, publish findings, or treat a missing scanner as proof of safety. Use an optional differential-review skill only when it is actually installed and compatible; otherwise trace manually.

Write reports to a private, user-approved destination. Separate confirmed findings, hypotheses, unavailable checks, remediation, and residual risk. Preserve the working tree and verify that review mode made no repository changes.
