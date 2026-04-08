import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext, { type AuthContextType } from "~/context/auth/auth-context";
import { queryClient } from "~/lib/query-client";
import type { RegisterRequest } from "~/types/auth";

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};

export const useRegister = () => {
	const auth = useAuth();

	return useMutation({
		mutationFn: (data: RegisterRequest) => {
			return auth.register(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["current-user"] });
		},
	});
};
