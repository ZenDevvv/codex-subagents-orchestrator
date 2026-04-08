import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

interface AuthShellProps {
	title: string;
	description: string;
	children: ReactNode;
	footer?: ReactNode;
}

export function AuthShell({ title, description, children, footer }: AuthShellProps) {
	return (
		<Card className="w-full max-w-lg border border-white/70 bg-white/90 backdrop-blur-sm">
			<CardHeader className="gap-3">
				<CardTitle className="text-3xl font-semibold tracking-tight">{title}</CardTitle>
				<CardDescription className="max-w-md text-sm leading-6 text-slate-600">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{children}
				{footer ? <div className="text-sm text-slate-600">{footer}</div> : null}
			</CardContent>
		</Card>
	);
}
