import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/landing";
import { useAuth } from "~/hooks/use-auth";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PAGE_TITLES } from "~/configs/page-titles";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.landing }];
}

export default function LandingPage() {
	const { user } = useAuth();

	return (
		<div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,235,205,0.85),_transparent_42%),linear-gradient(180deg,#f8f4ec_0%,#f3f6fb_48%,#e1ece6_100%)]">
			<div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 lg:px-10">
				<header className="flex items-center justify-between py-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
							AI Dev Orchestrator V2
						</p>
						<h1 className="mt-2 text-2xl font-semibold text-slate-900">Build by slice</h1>
					</div>
					<div className="flex items-center gap-3">
						<Button asChild variant="ghost">
							<Link to="/login">Sign in</Link>
						</Button>
						<Button asChild>
							<Link to={user ? "/dashboard" : "/register"}>
								{user ? "Open dashboard" : "Start the reference slice"}
							</Link>
						</Button>
					</div>
				</header>

				<section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr]">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm text-emerald-800 shadow-sm">
							<Sparkles className="size-4" />
							Canonical slice: register, sign in, reach a protected dashboard
						</div>
						<div className="space-y-5">
							<h2 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-slate-950 md:text-6xl">
								Make the workflow prove itself before you trust it.
							</h2>
							<p className="max-w-2xl text-lg leading-8 text-slate-700">
								This starter now includes a reference auth slice, deterministic repo health
								checks, and aligned docs so the orchestrator demonstrates a real delivery
								path instead of a loose scaffold.
							</p>
						</div>
						<div className="flex flex-wrap gap-4">
							<Button asChild size="lg" className="rounded-full px-6">
								<Link to={user ? "/dashboard" : "/register"}>
									{user ? "Continue to dashboard" : "Create an account"}
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg" className="rounded-full px-6">
								<Link to="/login">Use existing credentials</Link>
							</Button>
						</div>
					</div>

					<Card className="border border-white/70 bg-white/80 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-2xl">What changed in this repo</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 text-sm leading-7 text-slate-700">
							<div className="flex gap-3">
								<ShieldCheck className="mt-1 size-4 shrink-0 text-emerald-700" />
								<p>
									Public auth is now a real slice: register, sign in, load a protected
									dashboard, and sign out.
								</p>
							</div>
							<div className="flex gap-3">
								<ShieldCheck className="mt-1 size-4 shrink-0 text-emerald-700" />
								<p>
									`/doctor` can audit command drift, test tags, missing scripts, module
									claims, and encoding problems.
								</p>
							</div>
							<div className="flex gap-3">
								<ShieldCheck className="mt-1 size-4 shrink-0 text-emerald-700" />
								<p>
									The docs now treat the templates as evidence, not placeholders.
								</p>
							</div>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}
