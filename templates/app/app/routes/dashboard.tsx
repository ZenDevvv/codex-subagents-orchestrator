import { Activity, ArrowRight, ShieldCheck, UserRound } from "lucide-react";

import type { Route } from "./+types/dashboard";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { PAGE_TITLES } from "~/configs/page-titles";
import { useAuth } from "~/hooks/use-auth";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.dashboard }];
}

export default function DashboardPage() {
	const { user } = useAuth();
	const firstName = user?.person?.personalInfo?.firstName || user?.userName || "there";
	const fullName =
		[user?.person?.personalInfo?.firstName, user?.person?.personalInfo?.lastName]
			.filter(Boolean)
			.join(" ") || user?.userName;

	return (
		<div className="space-y-8" data-testid="dashboard-page">
			<section className="rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#164e63_42%,#166534_100%)] px-8 py-10 text-white">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="space-y-4">
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
							Protected Dashboard
						</p>
						<h1 className="text-4xl font-semibold tracking-tight" data-testid="dashboard-heading">
							Welcome back, {firstName}.
						</h1>
						<p className="max-w-2xl text-sm leading-7 text-slate-200">
							This page is the visible proof that the canonical auth slice works: public
							registration, authenticated session bootstrap, protected routing, and clean sign
							out.
						</p>
					</div>
					<div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm text-slate-100">
						<p className="text-xs uppercase tracking-[0.24em] text-emerald-200">Current user</p>
						<p className="mt-2 font-medium">{fullName}</p>
						<p className="text-slate-300">{user?.email}</p>
					</div>
				</div>
			</section>

			<section className="grid gap-5 md:grid-cols-3">
				<Card className="border border-white/60 bg-white/75 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-base">Session status</CardTitle>
						<ShieldCheck className="size-5 text-emerald-700" />
					</CardHeader>
					<CardContent className="space-y-2 text-sm text-slate-700">
						<p className="text-3xl font-semibold text-slate-950">Active</p>
						<p>The dashboard route is guarded and only renders with an authenticated user.</p>
					</CardContent>
				</Card>

				<Card className="border border-white/60 bg-white/75 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-base">Role assignment</CardTitle>
						<UserRound className="size-5 text-amber-700" />
					</CardHeader>
					<CardContent className="space-y-2 text-sm text-slate-700">
						<p className="text-3xl font-semibold text-slate-950">{user?.role || "user"}</p>
						<p>The public registration contract does not expose role selection.</p>
					</CardContent>
				</Card>

				<Card className="border border-white/60 bg-white/75 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-base">Next action</CardTitle>
						<Activity className="size-5 text-sky-700" />
					</CardHeader>
					<CardContent className="space-y-2 text-sm text-slate-700">
						<p className="text-3xl font-semibold text-slate-950">/doctor</p>
						<p>Run repo health checks after changing commands, docs, tags, or template contracts.</p>
					</CardContent>
				</Card>
			</section>

			<Card className="border border-white/60 bg-white/75 backdrop-blur-sm">
				<CardHeader>
					<CardTitle>Reference slice checklist</CardTitle>
					<CardDescription>
						These are the behaviors the mocked and live tests should both validate.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 text-sm text-slate-700 md:grid-cols-2">
					<div className="rounded-2xl bg-slate-50 p-5">
						<p className="font-medium text-slate-900">Public flow</p>
						<ul className="mt-3 space-y-2">
							<li className="flex gap-2">
								<ArrowRight className="mt-1 size-4 shrink-0 text-emerald-700" />
								<span>User can reach `/register` and submit the minimal signup contract.</span>
							</li>
							<li className="flex gap-2">
								<ArrowRight className="mt-1 size-4 shrink-0 text-emerald-700" />
								<span>User can open `/login` and authenticate with the same credentials.</span>
							</li>
						</ul>
					</div>
					<div className="rounded-2xl bg-slate-50 p-5">
						<p className="font-medium text-slate-900">Protected flow</p>
						<ul className="mt-3 space-y-2">
							<li className="flex gap-2">
								<ArrowRight className="mt-1 size-4 shrink-0 text-emerald-700" />
								<span>Authenticated users land on a visible dashboard with stable identifiers.</span>
							</li>
							<li className="flex gap-2">
								<ArrowRight className="mt-1 size-4 shrink-0 text-emerald-700" />
								<span>Sign out clears session state and returns the user to `/login`.</span>
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
