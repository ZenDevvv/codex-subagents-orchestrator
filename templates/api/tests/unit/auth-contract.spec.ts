import { expect } from "chai";
import { LoginSchema, RegisterSchema } from "../../zod/auth.zod";

describe("auth contract unit", () => {
	it("accepts the minimal public register payload", () => {
		const result = RegisterSchema.safeParse({
			firstName: "Ada",
			lastName: "Lovelace",
			email: "ada@example.com",
			userName: "adal",
			password: "secret123",
		});

		expect(result.success).to.equal(true);
	});

	it("rejects public role assignment during registration", () => {
		const result = RegisterSchema.safeParse({
			firstName: "Ada",
			lastName: "Lovelace",
			email: "ada@example.com",
			userName: "adal",
			password: "secret123",
			role: "admin",
		});

		expect(result.success).to.equal(false);
	});

	it("accepts login with an email identifier", () => {
		const result = LoginSchema.safeParse({
			identifier: "ada@example.com",
			password: "secret123",
		});

		expect(result.success).to.equal(true);
	});

	it("accepts login with a username identifier", () => {
		const result = LoginSchema.safeParse({
			identifier: "adal",
			password: "secret123",
		});

		expect(result.success).to.equal(true);
	});
});
