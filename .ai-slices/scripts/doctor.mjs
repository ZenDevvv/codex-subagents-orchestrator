import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

const errors = [];

const expectedPublicCommands = [
	"/discover",
	"/plan",
	"/build <next|SLICE_ID|all>",
	"/resume",
	"/change <description>",
	"/fix-bugs <all|next|SLICE_ID|BUG_DESCRIPTION>",
	"/ship [all|docs|deploy]",
	"/doctor",
];

const expectedOptionalCommands = ["/review [scope]", "/checkpoint"];

function toRepoPath(targetPath) {
	return path.relative(repoRoot, targetPath).replace(/\\/g, "/");
}

function readText(relativePath) {
	return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function exists(relativePath) {
	return fs.existsSync(path.join(repoRoot, relativePath));
}

function addError(message, file) {
	errors.push(file ? `${message} (${file})` : message);
}

function walk(directoryPath, predicate = () => true) {
	const output = [];

	if (!fs.existsSync(directoryPath)) {
		return output;
	}

	for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "dist" || entry.name === "build") {
			continue;
		}

		const fullPath = path.join(directoryPath, entry.name);
		if (entry.isDirectory()) {
			output.push(...walk(fullPath, predicate));
			continue;
		}

		if (predicate(fullPath)) {
			output.push(fullPath);
		}
	}

	return output;
}

function assertCommandSurface(relativePath) {
	const text = readText(relativePath);
	const normalized = text.replace(/\\\|/g, "|");

	for (const command of expectedPublicCommands) {
		if (!normalized.includes(command)) {
			addError(`Missing public command "${command}"`, relativePath);
		}
	}

	for (const command of expectedOptionalCommands) {
		if (!normalized.includes(command)) {
			addError(`Missing optional command "${command}"`, relativePath);
		}
	}
}

function assertCommandFilesExist() {
	const commandFiles = [
		"discover",
		"plan",
		"build",
		"resume",
		"change",
		"fix-bugs",
		"ship",
		"review",
		"checkpoint",
		"doctor",
	];

	for (const name of commandFiles) {
		const relativePath = `.ai-slices/.codex/commands/${name}.md`;
		if (!exists(relativePath)) {
			addError("Missing command file", relativePath);
		}
	}
}

function assertNoLegacyClaudeCommandSurface() {
	const markdownFiles = walk(repoRoot, (fullPath) => /\.md$/i.test(fullPath));
	const legacyMarkers = [".ai-slices/.claude/commands/", ".ai-slices/CLAUDE.md"];

	for (const fullPath of markdownFiles) {
		const text = fs.readFileSync(fullPath, "utf8");
		for (const marker of legacyMarkers) {
			if (text.includes(marker)) {
				addError(`Legacy Claude workflow reference found: ${marker}`, toRepoPath(fullPath));
			}
		}
	}
}

function assertNoLegacyPhaseTags() {
	const files = walk(repoRoot, (fullPath) => /\.(md|ts|tsx|js|json)$/i.test(fullPath));
	const legacyPattern = /@phase\d+|phase\s+\d+/i;

	for (const fullPath of files) {
		const text = fs.readFileSync(fullPath, "utf8");
		if (legacyPattern.test(text)) {
			addError("Legacy phase naming detected", toRepoPath(fullPath));
		}
	}
}

function assertSliceTags() {
	const e2eFiles = walk(path.join(repoRoot, "templates", "app", "tests", "e2e"), (fullPath) =>
		/\.ts$/i.test(fullPath),
	);
	const merged = e2eFiles.map((fullPath) => fs.readFileSync(fullPath, "utf8")).join("\n");

	if (!merged.includes("@slice-mocked")) {
		addError("No @slice-mocked Playwright coverage found", "templates/app/tests/e2e");
	}

	if (!merged.includes("@slice-live")) {
		addError("No @slice-live Playwright coverage found", "templates/app/tests/e2e");
	}
}

function extractFileRefs(scriptCommand) {
	const refs = [];
	const matches = scriptCommand.matchAll(/(^|[\s"'`])(\.?\.?[A-Za-z0-9_./-]+\.(?:[mc]?js|ts|tsx|json))(?=$|[\s"'`])/g);

	for (const match of matches) {
		const candidate = match[2];
		if (
			candidate.includes("*") ||
			candidate.startsWith("dist/") ||
			candidate.startsWith("./dist/") ||
			candidate.startsWith("build/") ||
			candidate.startsWith("./build/") ||
			candidate.startsWith("docs/generated/")
		) {
			continue;
		}

		refs.push(candidate);
	}

	return refs;
}

function assertPackageScriptRefs(relativePath) {
	const packageJson = JSON.parse(readText(relativePath));
	const baseDir = path.dirname(path.join(repoRoot, relativePath));

	for (const [scriptName, scriptCommand] of Object.entries(packageJson.scripts || {})) {
		for (const ref of extractFileRefs(scriptCommand)) {
			const resolvedPath = path.resolve(baseDir, ref);
			if (!fs.existsSync(resolvedPath)) {
				addError(
					`Script "${scriptName}" references a missing file: ${ref}`,
					relativePath,
				);
			}
		}
	}
}

function assertRequiredScripts(relativePath, requiredScripts) {
	const packageJson = JSON.parse(readText(relativePath));
	const scripts = packageJson.scripts || {};

	for (const scriptName of requiredScripts) {
		if (!scripts[scriptName]) {
			addError(`Missing required script "${scriptName}"`, relativePath);
		}
	}
}

function assertRequiredFiles(relativePaths) {
	for (const relativePath of relativePaths) {
		if (!exists(relativePath)) {
			addError("Missing required file", relativePath);
		}
	}
}

function getMarkdownProjectRoot(relativePath) {
	if (relativePath.startsWith("templates/api/")) {
		return path.join(repoRoot, "templates", "api");
	}

	if (relativePath.startsWith("templates/app/")) {
		return path.join(repoRoot, "templates", "app");
	}

	if (relativePath.startsWith(".ai-slices/")) {
		return path.join(repoRoot, ".ai-slices");
	}

	return repoRoot;
}

function resolveMarkdownRef(baseDir, projectRoot, candidate) {
	if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
		return null;
	}

	if (candidate.startsWith(".ai-slices/") || candidate.startsWith("templates/")) {
		return path.join(repoRoot, candidate);
	}

	if (
		candidate.startsWith("./") ||
		candidate.startsWith("../") ||
		candidate.startsWith("app/") ||
		candidate.startsWith("config/") ||
		candidate.startsWith("docs/") ||
		candidate.startsWith("helper/") ||
		candidate.startsWith("middleware/") ||
		candidate.startsWith("prisma/") ||
		candidate.startsWith("scripts/") ||
		candidate.startsWith("tests/") ||
		candidate.startsWith("utils/") ||
		candidate.startsWith("zod/")
	) {
		return path.resolve(projectRoot, candidate);
	}

	return null;
}

function assertMarkdownFileRefsExist(relativePath) {
	const text = readText(relativePath);
	const baseDir = path.dirname(path.join(repoRoot, relativePath));
	const projectRoot = getMarkdownProjectRoot(relativePath);
	const matches = text.matchAll(/`([^`\n]+?\.(?:md|ts|tsx|js|mjs|json|yml|yaml|prisma))`/g);

	for (const match of matches) {
		const candidate = match[1];
		const resolvedPath = resolveMarkdownRef(baseDir, projectRoot, candidate);

		if (!resolvedPath) {
			continue;
		}

		if (!fs.existsSync(resolvedPath)) {
			addError(`Markdown references a missing file: ${candidate}`, relativePath);
		}
	}
}

function parseModuleListFromReadme() {
	const text = readText("templates/api/README.md");
	const modules = new Set();

	for (const match of text.matchAll(/([a-zA-Z][\w-]*)\/\s+#/g)) {
		const name = match[1];
		if (!["app", "config", "helper", "docs"].includes(name)) {
			modules.add(name);
		}
	}

	for (const match of text.matchAll(/-\s+`([\w-]+)`/g)) {
		modules.add(match[1]);
	}

	return modules;
}

function parseRegisteredModules() {
	const text = readText("templates/api/index.ts");
	const matches = text.matchAll(/from "\.\/app\/([\w-]+)"/g);
	const modules = new Set();

	for (const match of matches) {
		modules.add(match[1]);
	}

	return modules;
}

function assertApiReadmeMatchesModules() {
	const documented = parseModuleListFromReadme();
	const registered = parseRegisteredModules();

	for (const name of documented) {
		if (!registered.has(name)) {
			addError(`API README documents an unregistered module: ${name}`, "templates/api/README.md");
		}
	}

	for (const name of registered) {
		if (!documented.has(name)) {
			addError(`API entrypoint registers an undocumented module: ${name}`, "templates/api/index.ts");
		}
	}
}

function parseRoleEnumFromZod(text) {
	const match = text.match(/export const Role = z\.enum\(\[([\s\S]*?)\]\)/);
	if (!match) {
		return [];
	}

	return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]).sort();
}

function parseRoleEnumFromPrisma(text) {
	const match = text.match(/enum Role\s*{([\s\S]*?)}/);
	if (!match) {
		return [];
	}

	return match[1]
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean)
		.sort();
}

function assertAuthContractShape(relativePath) {
	const text = readText(relativePath);
	const requiredFields = ["firstName", "lastName", "email", "userName", "password"];

	for (const field of requiredFields) {
		if (!text.includes(field)) {
			addError(`Auth register contract missing field "${field}"`, relativePath);
		}
	}

	if (text.includes("role:") || text.includes('"role"') || text.includes("subRole")) {
		addError("Public register contract should not expose role or subRole", relativePath);
	}
}

function assertRoleEnumParity() {
	const zodRoles = parseRoleEnumFromZod(readText("templates/api/zod/user.zod.ts"));
	const prismaRoles = parseRoleEnumFromPrisma(readText("templates/api/prisma/schema/user.prisma"));

	if (JSON.stringify(zodRoles) !== JSON.stringify(prismaRoles)) {
		addError(
			`Role enum drift detected between Zod (${zodRoles.join(", ")}) and Prisma (${prismaRoles.join(", ")})`,
			"templates/api/zod/user.zod.ts",
		);
	}
}

function assertNoMojibake() {
	const markdownFiles = walk(repoRoot, (fullPath) => /\.md$/i.test(fullPath));
	const mojibakePattern = /â[^\s]|ðŸ|�/;

	for (const fullPath of markdownFiles) {
		const text = fs.readFileSync(fullPath, "utf8");
		if (mojibakePattern.test(text)) {
			addError("Possible encoding corruption detected", toRepoPath(fullPath));
		}
	}
}

function assertReferenceDocsAreConcrete() {
	const referenceDir = path.join(repoRoot, ".ai-slices", "docs", "reference");
	const files = walk(referenceDir, (fullPath) => /\.md$/i.test(fullPath));

	if (files.length === 0) {
		addError("Missing permanent reference documentation", ".ai-slices/docs/reference");
		return;
	}

	for (const fullPath of files) {
		const text = fs.readFileSync(fullPath, "utf8");
		if (/\bTBD\b|\bTODO\b/.test(text)) {
			addError("Reference docs still contain placeholders", toRepoPath(fullPath));
		}
	}
}

assertCommandSurface("README.md");
assertCommandSurface(".ai-slices/README.md");
assertCommandSurface(".ai-slices/CODEX.md");
assertCommandFilesExist();
assertNoLegacyClaudeCommandSurface();
assertNoLegacyPhaseTags();
assertSliceTags();
assertPackageScriptRefs("templates/api/package.json");
assertPackageScriptRefs("templates/app/package.json");
assertRequiredScripts("templates/api/package.json", [
	"test:smoke",
	"test:integration",
	"test:unit",
	"test:tdd",
]);
assertRequiredScripts("templates/app/package.json", [
	"test:smoke",
	"test:mocked",
	"test:live",
]);
assertRequiredFiles([
	"templates/api/tests/support/test-bootstrap.ts",
	"templates/api/tests/support/create-api-test-app.ts",
	"templates/api/tests/templates/template.controller.spec.ts",
	"templates/api/tests/smoke/api.smoke.spec.ts",
	"templates/api/tests/integration/auth-reference.spec.ts",
	"templates/api/tests/unit/auth-contract.spec.ts",
]);
assertMarkdownFileRefsExist("README.md");
assertMarkdownFileRefsExist("templates/api/README.md");
assertMarkdownFileRefsExist("templates/app/README.md");
assertMarkdownFileRefsExist("templates/api/docs/SECURITY_IMPLEMENTATION.md");
assertApiReadmeMatchesModules();
assertAuthContractShape("templates/api/zod/auth.zod.ts");
assertAuthContractShape("templates/app/app/zod/auth.zod.ts");
assertRoleEnumParity();
assertNoMojibake();
assertReferenceDocsAreConcrete();
assertRequiredFiles([".ai-slices/docs/codex-subagent-workflow.md"]);

if (errors.length > 0) {
	console.error("Doctor found repo drift:\n");
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	console.error(`\n${errors.length} issue(s) found.`);
	process.exit(1);
}

console.log("Doctor check passed.");
console.log("No orchestrator, template, or contract drift detected.");
