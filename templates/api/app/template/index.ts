import express, { Router } from "express";
import { controller } from "./template.controller";
import { router } from "./template.router";
import { PrismaClient } from "../../generated/prisma/index";

export const templateModule = (prisma: PrismaClient): Router => {
	return router(express.Router(), controller(prisma));
};
