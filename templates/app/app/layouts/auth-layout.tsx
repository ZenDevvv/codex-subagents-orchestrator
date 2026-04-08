import { Outlet } from "react-router";

const AuthLayout = () => {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f4efe4_0%,#dde9e3_45%,#f5f7fb_100%)]">
			<div className="absolute inset-0 opacity-60">
				<div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
				<div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-100/80 blur-3xl" />
				<div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-100/80 blur-3xl" />
			</div>
			<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12 lg:px-10">
				<Outlet />
			</div>
		</main>
	);
};

export default AuthLayout;
