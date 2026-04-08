import { Home, LogOut } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatarFlat from "@/assets/images/avatarFlat.png";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/use-auth";

export function AppSidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const sidebar = useSidebar();
	const { logout, user } = useAuth();

	const displayName =
		[user?.person?.personalInfo?.firstName, user?.person?.personalInfo?.lastName]
			.filter(Boolean)
			.join(" ") ||
		user?.userName ||
		"User";

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader
				className={`border-b border-sidebar-border ${sidebar.open ? "p-4" : ""} py-6`}>
				<div className="flex items-center justify-between w-full">
					{sidebar.open && (
						<div className="flex items-center gap-2">
							<div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<img src={avatarFlat} alt="" />
							</div>
							<div className="flex flex-col">
								<span className="font-semibold text-sm">Slice Reference</span>
								<span className="text-xs text-sidebar-foreground/70">Auth + Dashboard</span>
							</div>
						</div>
					)}
					<SidebarTrigger className="cursor-pointer" />
				</div>
			</SidebarHeader>
			<SidebarContent className="p-3">
				<Link
					to="/dashboard"
					className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
						location.pathname === "/dashboard"
							? "bg-sidebar-primary text-sidebar-primary-foreground"
							: "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
					}`}>
					<Home className="size-4" />
					{sidebar.open ? <span>Dashboard</span> : null}
				</Link>
			</SidebarContent>
			<SidebarFooter className="border-t border-sidebar-border p-2 py-4">
				<div className="space-y-3">
					<div className={`flex items-center gap-3 rounded-lg py-2 ${sidebar.open ? "px-2" : ""}`}>
						<Avatar className="size-8">
							<AvatarImage src={user?.avatar || avatarFlat} />
						</Avatar>
						{sidebar.open && (
							<div className="flex min-w-0 flex-col text-sm">
								<span className="truncate font-medium">{displayName}</span>
								<span className="truncate text-xs text-sidebar-foreground/65">{user?.email}</span>
							</div>
						)}
					</div>
					<Button
						type="button"
						variant="ghost"
						onClick={handleLogout}
						data-testid="logout-button"
						className={`w-full cursor-pointer justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${sidebar.open ? "" : "px-2"}`}>
						<LogOut className="size-4" />
						{sidebar.open ? <span>Sign out</span> : null}
					</Button>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
