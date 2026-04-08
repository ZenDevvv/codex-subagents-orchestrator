import express, { Router } from "express";
import { controller } from "./auth.controller";
import { router } from "./auth.router";
import { PrismaClient } from "../../generated/prisma/index";

export const authModule = (prisma: PrismaClient): Router => {
	return router(express.Router(), controller(prisma));
};
