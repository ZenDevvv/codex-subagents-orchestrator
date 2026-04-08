import fs from "fs";
import path from "path";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
process.env.DATABASE_URL =
	process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/codex-subagents-orchestrator-test";
process.env.CORS_ORIGINS = process.env.CORS_ORIGINS || "http://127.0.0.1:4173";
process.env.CORS_CREDENTIALS = process.env.CORS_CREDENTIALS || "true";
process.env.REDIS_ENABLED = "false";

const logsDir = path.resolve(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir, { recursive: true });
}
