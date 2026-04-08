import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { AppSidebar } from "~/components/organisms/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { useAuth } from "~/hooks/use-auth";

export default function AdminLayout() {
	const { isLoading, user } = useAuth();
	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-secondary text-slate-600">
				Loading your workspace...
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return (
		<main className="h-screen bg-secondary">
			<SidebarProvider>
				<div className="flex h-screen w-full">
					<AppSidebar />

					<div className="flex flex-1 flex-col p-4 pl-0">
						<div className="flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-xl shadow-slate-900/5 backdrop-blur-sm">
							<div className="flex-1 overflow-y-auto p-6 lg:p-8">
								<Suspense fallback={<div className="text-slate-600">Loading...</div>}>
									<Outlet />
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</SidebarProvider>
		</main>
	);
}
