import { z } from "zod";
export const RegisterSchema = z.object({
	firstName: z.string().trim().min(1, "First name is required"),
	lastName: z.string().trim().min(1, "Last name is required"),
	email: z.string().email("Invalid email format"),
	userName: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(50, "Username must be at most 50 characters")
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			"Username can only contain letters, numbers, underscores, and hyphens",
		),
	password: z.string().min(6, "Password must be at least 6 characters long"),
}).strict();

export const LoginSchema = z.object({
	identifier: z
		.string()
		.email("Invalid email format")
		.or(z.string().min(1, "Username is required")),
	password: z.string().min(1, "Password is required"),
}).strict();

export const UpdatePasswordSchema = z.object({
	userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
}).strict();
