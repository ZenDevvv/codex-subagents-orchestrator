import cookieParser from "cookie-parser";
import express, { type Request, type Response, type NextFunction } from "express";
import type { PrismaClient } from "../../generated/prisma";
import { authModule } from "../../app/auth";
import { userModule } from "../../app/user";
import verifyToken from "../../middleware/verifyToken";
import type { AuthRequest } from "../../middleware/verifyToken";

export function createApiTestApp(prisma: PrismaClient) {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());

	app.get("/", (_req: Request, res: Response) => {
		res.status(200).json({
			status: "healthy",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
		});
	});

	app.get("/health", (_req: Request, res: Response) => {
		res.status(200).json({
			status: "healthy",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			message: "SLA monitoring is active",
		});
	});

	app.use("/api", (req: Request, res: Response, next: NextFunction) => {
		if (req.path.startsWith("/auth")) {
			return next();
		}

		verifyToken(req as AuthRequest, res, next);
	});

	app.use("/api", authModule(prisma));
	app.use("/api", userModule(prisma));

	return app;
}
