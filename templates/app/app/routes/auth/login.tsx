import type { FormEvent } from "react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

import type { Route } from "./+types/login";
import { AuthShell } from "~/components/organisms/auth-shell";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { PAGE_TITLES } from "~/configs/page-titles";
import { useAuth } from "~/hooks/use-auth";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.login }];
}

export default function LoginPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { clearError, error, isLoading, login, user } = useAuth();
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");

	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		clearError();

		try {
			await login(identifier, password);
			navigate("/dashboard");
		} catch (_error) {
			// Context state already stores the actionable error.
		}
	};

	return (
		<div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr]">
			<div className="hidden flex-col justify-between rounded-[2rem] border border-white/60 bg-slate-950 px-8 py-10 text-white shadow-2xl shadow-slate-900/15 lg:flex">
				<div className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
						Protected Slice
					</p>
					<h1 className="text-4xl font-semibold tracking-tight">
						Sign in and verify the dashboard contract.
					</h1>
					<p className="max-w-md text-sm leading-7 text-slate-300">
						This page is the public entry point for the reference slice. Successful login must
						set session state, unlock `/dashboard`, and support a clean sign-out path.
					</p>
				</div>
				<p className="text-sm text-slate-400">
					Deterministic checks belong in `/doctor`. User-visible proof belongs here.
				</p>
			</div>

			<div className="flex items-center justify-center">
				<AuthShell
					title="Sign in"
					description="Use an existing account to load the protected dashboard. The same route is used by the mocked and live slice tests."
					footer={
						<>
							No account yet?{" "}
							<Link to="/register" className="font-medium text-emerald-700 hover:text-emerald-800">
								Create one now
							</Link>
							.
						</>
					}>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label htmlFor="identifier" className="text-sm font-medium text-slate-800">
								Email or username
							</label>
							<Input
								id="identifier"
								data-testid="login-identifier"
								autoComplete="username"
								value={identifier}
								onChange={(event) => setIdentifier(event.target.value)}
								placeholder="you@example.com"
								required
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium text-slate-800">
								Password
							</label>
							<Input
								id="password"
								data-testid="login-password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								placeholder="Enter your password"
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
						{typeof location.state?.message === "string" ? (
							<div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
								{location.state.message}
							</div>
						) : null}
						<Button
							type="submit"
							data-testid="login-submit"
							className="h-11 w-full rounded-xl"
							disabled={isLoading}>
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>
				</AuthShell>
			</div>
		</div>
	);
}
