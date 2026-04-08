import { expect } from "chai";
import { buildSuccessResponse, buildPagination } from "../../helper/success-handler";
import { buildErrorResponse, formatZodErrors } from "../../helper/error-handler";
import { RegisterSchema } from "../../zod/auth.zod";

describe("response helper unit", () => {
	it("builds consistent success envelopes", () => {
		const response = buildSuccessResponse("OK", { ready: true }, 201);

		expect(response.status).to.equal("success");
		expect(response.message).to.equal("OK");
		expect(response.data).to.deep.equal({ ready: true });
		expect(response.code).to.equal(201);
		expect(response.timestamp).to.be.a("string");
	});

	it("builds consistent error envelopes", () => {
		const response = buildErrorResponse("Validation failed", 400, [
			{ field: "email", message: "Email is required" },
		]);

		expect(response.status).to.equal("error");
		expect(response.message).to.equal("Validation failed");
		expect(response.code).to.equal(400);
		expect(response.errors).to.deep.equal([
			{ field: "email", message: "Email is required" },
		]);
	});

	it("formats zod issues into field-level errors", () => {
		const result = RegisterSchema.safeParse({
			firstName: "",
			lastName: "",
			email: "not-an-email",
			userName: "ab",
			password: "123",
		});

		if (result.success) {
			throw new Error("Expected invalid register payload");
		}

		const errors = formatZodErrors(result.error);

		expect(errors).to.deep.include({ field: "firstName", message: "First name is required" });
		expect(errors).to.deep.include({ field: "email", message: "Invalid email format" });
	});

	it("builds pagination metadata for list endpoints", () => {
		const pagination = buildPagination(23, 2, 10);

		expect(pagination).to.deep.equal({
			total: 23,
			page: 2,
			limit: 10,
			totalPages: 3,
			hasNext: true,
			hasPrev: true,
		});
	});
});
