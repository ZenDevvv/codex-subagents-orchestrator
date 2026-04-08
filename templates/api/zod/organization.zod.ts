import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const OrganizationSchema = z.object({
	id: z.string().refine((value) => isValidObjectId(value)),
	name: z.string().min(1, "Organization name is required"),
	description: z.string().optional().nullable(),
	code: z.string().min(1, "Organization code is required"),
	logo: z.string().url().optional().nullable(),
	background: z.string().url().optional().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Organization = z.infer<typeof OrganizationSchema>;

export const CreateOrganizationSchema = OrganizationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

export type UpdateOrganization = z.infer<typeof UpdateOrganizationSchema>;
