import request from "supertest";
import { expect } from "chai";
import { createApiTestApp } from "../support/create-api-test-app";
import { createStatefulPrismaMock } from "../support/stateful-prisma";

describe("api smoke", () => {
	it("boots the reference app and responds to health checks", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());

		const rootResponse = await request(app).get("/");
		const healthResponse = await request(app).get("/health");

		expect(rootResponse.status).to.equal(200);
		expect(rootResponse.body.status).to.equal("healthy");
		expect(healthResponse.status).to.equal(200);
		expect(healthResponse.body.message).to.equal("SLA monitoring is active");
	});

	it("rejects invalid public registration payloads before slice build can pass", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());

		const response = await request(app).post("/api/auth/register").send({
			firstName: "Ada",
			email: "ada@example.com",
		});

		expect(response.status).to.equal(400);
		expect(response.body.status).to.equal("error");
		expect(response.body.message).to.equal("Validation failed");
	});

	it("keeps protected current-user access behind authentication", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());

		const response = await request(app).get("/api/user/current");

		expect(response.status).to.equal(401);
		expect(response.body.message).to.equal("Unauthorized");
	});
});
