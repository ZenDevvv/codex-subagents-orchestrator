import { expect } from "chai";
import request from "supertest";
import { createApiTestApp } from "../support/create-api-test-app";
import {
	loginByEmailPayload,
	loginByUsernamePayload,
	registerPayload,
} from "../support/auth-fixtures";
import { createStatefulPrismaMock } from "../support/stateful-prisma";

describe("reference auth integration", () => {
	it("registers a user with the minimal public contract", async () => {
		const prisma = createStatefulPrismaMock();
		const app = createApiTestApp(prisma);

		const response = await request(app).post("/api/auth/register").send(registerPayload);

		expect(response.status).to.equal(201);
		expect(response.body.status).to.equal("success");
		expect(response.body.data.result.email).to.equal(registerPayload.email);
		expect(response.body.data.result.role).to.equal("user");
		expect(prisma.__state.users).to.have.lengthOf(1);
		expect(prisma.__state.users[0].password).to.not.equal(registerPayload.password);
	});

	it("rejects duplicate email registration", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());

		await request(app).post("/api/auth/register").send(registerPayload);
		const response = await request(app).post("/api/auth/register").send(registerPayload);

		expect(response.status).to.equal(400);
		expect(response.body.status).to.equal("error");
		expect(response.body.errors[0].field).to.equal("email");
	});

	it("logs in with an email identifier and loads the protected current-user route", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());
		const agent = request.agent(app);

		await agent.post("/api/auth/register").send(registerPayload);
		const loginResponse = await agent.post("/api/auth/login").send(loginByEmailPayload);
		const currentUserResponse = await agent.get("/api/user/current");

		expect(loginResponse.status).to.equal(200);
		expect(loginResponse.body.status).to.equal("success");
		expect(loginResponse.body.data.user.email).to.equal(registerPayload.email);
		expect(currentUserResponse.status).to.equal(200);
		expect(currentUserResponse.body.data.user.email).to.equal(registerPayload.email);
		expect(currentUserResponse.body.data.user.person.personalInfo.firstName).to.equal(
			registerPayload.firstName,
		);
	});

	it("logs in with a username identifier", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());
		const agent = request.agent(app);

		await agent.post("/api/auth/register").send(registerPayload);
		const response = await agent.post("/api/auth/login").send(loginByUsernamePayload);

		expect(response.status).to.equal(200);
		expect(response.body.data.user.userName).to.equal(registerPayload.userName);
	});

	it("rejects invalid credentials", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());

		await request(app).post("/api/auth/register").send(registerPayload);
		const response = await request(app).post("/api/auth/login").send({
			identifier: registerPayload.email,
			password: "wrong-password",
		});

		expect(response.status).to.equal(401);
		expect(response.body.message).to.equal("Invalid credentials");
	});

	it("clears the session cookie on logout", async () => {
		const app = createApiTestApp(createStatefulPrismaMock());
		const agent = request.agent(app);

		await agent.post("/api/auth/register").send(registerPayload);
		await agent.post("/api/auth/login").send(loginByEmailPayload);

		const logoutResponse = await agent.post("/api/auth/logout");
		const currentUserResponse = await agent.get("/api/user/current");

		expect(logoutResponse.status).to.equal(200);
		expect(logoutResponse.headers["set-cookie"][0]).to.contain("token=");
		expect(currentUserResponse.status).to.equal(401);
	});
});
