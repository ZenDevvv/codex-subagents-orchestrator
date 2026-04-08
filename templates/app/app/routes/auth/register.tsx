import type { FormEvent } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

import type { Route } from "./+types/register";
import { AuthShell } from "~/components/organisms/auth-shell";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { PAGE_TITLES } from "~/configs/page-titles";
import { useAuth } from "~/hooks/use-auth";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.register }];
}

const INITIAL_FORM = {
	firstName: "",
	lastName: "",
	email: "",
	userName: "",
	password: "",
};

export default function RegisterPage() {
	const navigate = useNavigate();
	const { clearError, error, isLoading, register, user } = useAuth();
	const [form, setForm] = useState(INITIAL_FORM);

	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	const handleChange = (field: keyof typeof INITIAL_FORM, value: string) => {
		setForm((current) => ({ ...current, [field]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		clearError();

		try {
			await register(form);
			setForm(INITIAL_FORM);
			navigate("/login", {
				state: {
					message: "Account created. Sign in to continue to the protected dashboard.",
				},
			});
		} catch (_error) {
			// Context state already stores the actionable error.
		}
	};

	return (
		<div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr]">
			<div className="hidden flex-col justify-between rounded-[2rem] border border-white/60 bg-white/55 px-8 py-10 backdrop-blur-sm lg:flex">
				<div className="space-y-5">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-800">
						Canonical Slice
					</p>
					<h1 className="text-4xl font-semibold tracking-tight text-slate-950">
						Register with the minimum contract that proves the journey.
					</h1>
					<p className="max-w-md text-sm leading-7 text-slate-700">
						Self-serve registration now defaults the role on the server. The public contract is
						intentionally small so the reference slice stays stable and easy to validate.
					</p>
				</div>
				<div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm leading-7 text-amber-950">
					<p className="font-medium">Public register payload</p>
					<pre className="mt-3 overflow-x-auto text-xs leading-6">
{`{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada@example.com",
  "userName": "adal",
  "password": "secret123"
}`}
					</pre>
				</div>
			</div>

			<div className="flex items-center justify-center">
				<AuthShell
					title="Create an account"
					description="The registration contract is intentionally small: identity, credentials, and nothing role-related."
					footer={
						<>
							Already registered?{" "}
							<Link to="/login" className="font-medium text-emerald-700 hover:text-emerald-800">
								Go to sign in
							</Link>
							.
						</>
					}>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<label htmlFor="firstName" className="text-sm font-medium text-slate-800">
									First name
								</label>
								<Input
									id="firstName"
									data-testid="register-first-name"
									value={form.firstName}
									onChange={(event) => handleChange("firstName", event.target.value)}
									autoComplete="given-name"
									required
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="lastName" className="text-sm font-medium text-slate-800">
									Last name
								</label>
								<Input
									id="lastName"
									data-testid="register-last-name"
									value={form.lastName}
									onChange={(event) => handleChange("lastName", event.target.value)}
									autoComplete="family-name"
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium text-slate-800">
								Email
							</label>
							<Input
								id="email"
								data-testid="register-email"
								type="email"
								autoComplete="email"
								value={form.email}
								onChange={(event) => handleChange("email", event.target.value)}
								placeholder="you@example.com"
								required
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="userName" className="text-sm font-medium text-slate-800">
								Username
							</label>
							<Input
								id="userName"
								data-testid="register-username"
								autoComplete="username"
								value={form.userName}
								onChange={(event) => handleChange("userName", event.target.value)}
								placeholder="choose-a-username"
								required
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium text-slate-800">
								Password
							</label>
							<Input
								id="password"
								data-testid="register-password"
								type="password"
								autoComplete="new-password"
								value={form.password}
								onChange={(event) => handleChange("password", event.target.value)}
								placeholder="At least 6 characters"
								required
							/>
						</div>
						{error ? (
							<div
								data-testid="auth-error"
								className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
								{error}
							</div>
						) : null}
						<Button
							type="submit"
							data-testid="register-submit"
							className="h-11 w-full rounded-xl"
							disabled={isLoading}>
							{isLoading ? "Creating account..." : "Create account"}
						</Button>
					</form>
				</AuthShell>
			</div>
		</div>
	);
}
