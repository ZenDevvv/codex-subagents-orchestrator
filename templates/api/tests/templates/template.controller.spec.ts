import { expect } from "chai";
import request from "supertest";
import { createApiTestApp } from "../support/create-api-test-app";
import { createStatefulPrismaMock } from "../support/stateful-prisma";

describe("template controller integration scaffold", () => {
	it("fails closed on protected routes until slice-specific assertions are added", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());
		const response = await request(app).get("/api/template");

		expect(response.status).to.equal(401);
	});
});
