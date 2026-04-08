import { createContext } from "react";
import type { RegisterRequest } from "~/types/auth";
import type { UserWithRelation } from "~/zod/user.zod";

export interface AuthContextType {
	user: UserWithRelation | null;
	isLoading: boolean;
	error: string | null;
	login: (identifier: string, password: string) => Promise<UserWithRelation>;
	register: (payload: RegisterRequest) => Promise<void>;
	logout: () => Promise<void>;
	getCurrentUser: () => Promise<void>;
	clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
