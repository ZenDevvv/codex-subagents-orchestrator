import { expect, test } from "@playwright/test";

const buildSuccess = (message: string, data: unknown, code = 200) => ({
	status: "success",
	message,
	data,
	code,
	timestamp: new Date().toISOString(),
});

const buildError = (message: string, code: number, errors?: Array<{ field?: string; message: string }>) => ({
	status: "error",
	message,
	code,
	errors,
	timestamp: new Date().toISOString(),
});

test("registers, signs in, loads the dashboard, and signs out @slice-mocked", async ({ page }) => {
	let sessionActive = false;

	await page.route("**/api/**", async (route) => {
		const url = new URL(route.request().url());
		const { pathname } = url;

		if (pathname.endsWith("/auth/register")) {
			await route.fulfill({
				status: 201,
				contentType: "application/json",
				body: JSON.stringify(
					buildSuccess(
						"Registration successful",
						{
							result: {
								id: "mock-user-id",
								email: "ada@example.com",
								userName: "adal",
								role: "user",
							},
						},
						201,
					),
				),
			});
			return;
		}

		if (pathname.endsWith("/auth/login")) {
			sessionActive = true;
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(
					buildSuccess("Logged in successfully", {
						user: {
							id: "mock-user-id",
							email: "ada@example.com",
							userName: "adal",
							role: "user",
							subRole: [],
							status: "active",
							isDeleted: false,
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
							person: {
								id: "mock-person-id",
								personalInfo: {
									firstName: "Ada",
									lastName: "Lovelace",
								},
								contactInfo: [],
								addresses: [],
								languages: [],
								emergencyContacts: [],
								kycStatus: "PENDING",
								createdAt: new Date().toISOString(),
								updatedAt: new Date().toISOString(),
							},
							token: "mock-token",
						},
						token: "mock-token",
					}),
				),
			});
			return;
		}

		if (pathname.endsWith("/auth/logout")) {
			sessionActive = false;
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(buildSuccess("Logged out successfully", { success: true })),
			});
			return;
		}

		if (pathname.endsWith("/user/current")) {
			if (!sessionActive) {
				await route.fulfill({
					status: 401,
					contentType: "application/json",
					body: JSON.stringify(
						buildError("Unauthorized", 401, [
							{ field: "session", message: "Authentication required" },
						]),
					),
				});
				return;
			}

			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(
					buildSuccess("Current user retrieved", {
						user: {
							id: "mock-user-id",
							email: "ada@example.com",
							userName: "adal",
							role: "user",
							subRole: [],
							status: "active",
							isDeleted: false,
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
							person: {
								id: "mock-person-id",
								personalInfo: {
									firstName: "Ada",
									lastName: "Lovelace",
								},
								contactInfo: [],
								addresses: [],
								languages: [],
								emergencyContacts: [],
								kycStatus: "PENDING",
								createdAt: new Date().toISOString(),
								updatedAt: new Date().toISOString(),
							},
						},
					}),
				),
			});
			return;
		}

		await route.continue();
	});

	await page.goto("/register");
	await page.getByTestId("register-first-name").fill("Ada");
	await page.getByTestId("register-last-name").fill("Lovelace");
	await page.getByTestId("register-email").fill("ada@example.com");
	await page.getByTestId("register-username").fill("adal");
	await page.getByTestId("register-password").fill("secret123");
	await page.getByTestId("register-submit").click();

	await expect(page).toHaveURL(/\/login$/);
	await expect(page.getByText("Account created. Sign in to continue to the protected dashboard.")).toBeVisible();

	await page.getByTestId("login-identifier").fill("ada@example.com");
	await page.getByTestId("login-password").fill("secret123");
	await page.getByTestId("login-submit").click();

	await expect(page).toHaveURL(/\/dashboard$/);
	await expect(page.getByTestId("dashboard-heading")).toContainText("Ada");

	await page.getByTestId("logout-button").click();
	await expect(page).toHaveURL(/\/login$/);
});
