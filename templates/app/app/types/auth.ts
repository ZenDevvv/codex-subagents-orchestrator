import type { UserWithRelation } from "~/zod/user.zod";

export interface LoginRequest {
	identifier: string;
	password: string;
}

export interface RegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	userName: string;
	password: string;
}

export interface RegisterResponse {
	result: {
		id: string;
		email: string;
		userName: string;
		role: string;
	};
}

export type LoginResponse = {
	user: UserWithRelation;
	token: string;
};

export type CurrentUserResponse = {
	user: UserWithRelation;
};
