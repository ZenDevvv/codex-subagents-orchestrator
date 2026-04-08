import { expect, test } from "@playwright/test";

const LIVE_ENABLED = process.env.E2E_ENABLE_LIVE === "1";
const API_BASE_URL = process.env.E2E_API_BASE_URL || "http://127.0.0.1:3000";

test("registers, signs in, loads the dashboard, and signs out against a live backend @slice-live", async ({
	page,
	request,
}) => {
	test.skip(!LIVE_ENABLED, "Set E2E_ENABLE_LIVE=1 to run the live backend slice test.");

	const healthResponse = await request.get(`${API_BASE_URL}/health`).catch(() => null);

	test.skip(!healthResponse?.ok(), `Live backend not available at ${API_BASE_URL}.`);

	const uniqueId = Date.now();
	const account = {
		firstName: "Slice",
		lastName: "Tester",
		email: `slice-${uniqueId}@example.com`,
		userName: `slice${uniqueId}`,
		password: "secret123",
	};

	await page.goto("/register");
	await page.getByTestId("register-first-name").fill(account.firstName);
	await page.getByTestId("register-last-name").fill(account.lastName);
	await page.getByTestId("register-email").fill(account.email);
	await page.getByTestId("register-username").fill(account.userName);
	await page.getByTestId("register-password").fill(account.password);
	await page.getByTestId("register-submit").click();

	await expect(page).toHaveURL(/\/login$/);
	await page.getByTestId("login-identifier").fill(account.email);
	await page.getByTestId("login-password").fill(account.password);
	await page.getByTestId("login-submit").click();

	await expect(page).toHaveURL(/\/dashboard$/);
	await expect(page.getByTestId("dashboard-heading")).toContainText(account.firstName);

	await page.getByTestId("logout-button").click();
	await expect(page).toHaveURL(/\/login$/);
});
