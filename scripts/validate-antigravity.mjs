import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const agents = path.join(root, ".agents");
// Windows checkouts may convert LF to CRLF; normalize so frontmatter checks behave the same everywhere.
const lf = (value) => value.replace(/\r\n/g, "\n");
const text = async (file) => lf(await readFile(path.join(root, file), "utf8"));

assert((await stat(path.join(root, "GEMINI.md"))).isFile(), "GEMINI.md is required");
assert((await text("GEMINI.md")).includes("@AGENTS.md"), "GEMINI.md must bridge AGENTS.md");

const rules = path.join(agents, "rules");
for (const file of await readdir(rules)) {
  assert(file.endsWith(".md"), `${file}: rules directory may contain only Markdown files`);
  const content = lf(await readFile(path.join(rules, file), "utf8"));
  assert(content.startsWith("---\n"), `${file}: missing YAML frontmatter`);
  const header = content.slice(4, content.indexOf("\n---", 4));
  const trigger = header.match(/^trigger:\s*(\S+)/m)?.[1];
  assert(["always_on", "model_decision", "glob", "manual"].includes(trigger), `${file}: invalid trigger`);
  if (trigger === "model_decision") assert(/^description:\s*.+$/m.test(header), `${file}: model_decision needs description`);
  if (trigger === "glob") assert(/^globs?:\s*.+$/m.test(header), `${file}: glob needs globs`);
}

const skills = path.join(agents, "skills");
for (const dir of await readdir(skills, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const file = path.join(skills, dir.name, "SKILL.md");
  const content = lf(await readFile(file, "utf8"));
  assert(content.startsWith("---\n"), `${dir.name}: SKILL.md missing frontmatter`);
  const header = content.slice(4, content.indexOf("\n---", 4));
  assert(/^description:\s*.+$/m.test(header), `${dir.name}: SKILL.md needs description`);
  assert(Buffer.byteLength(content) <= 24000, `${dir.name}: SKILL.md exceeds 24 KB`);
}

const example = JSON.parse(await text(".agents/mcp_config.json.example"));
assert(example && typeof example.mcpServers === "object" && !Array.isArray(example.mcpServers), "MCP example needs mcpServers");
for (const [name, server] of Object.entries(example.mcpServers)) {
  assert(server.command || server.serverUrl || server.url, `${name}: MCP server needs command or serverUrl`);
  assert(!(server.command && (server.serverUrl || server.url)), `${name}: MCP server must use one transport`);
}

console.log(`PASS Antigravity: ${await readdir(rules).then((x) => x.length)} rules, ${await readdir(skills).then((x) => x.length)} skill bundles, valid MCP example`);
