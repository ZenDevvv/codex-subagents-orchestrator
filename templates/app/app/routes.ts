import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

const authRoutes: RouteConfig = [
	route("/login", "routes/auth/login.tsx"),
	route("/register", "routes/auth/register.tsx"),
];

const adminRoutes: RouteConfig = [route("/dashboard", "routes/dashboard.tsx")];

export default [
	index("routes/landing.tsx"),
	layout("layouts/auth-layout.tsx", authRoutes),
	layout("layouts/admin-layout.tsx", adminRoutes),
] satisfies RouteConfig;
