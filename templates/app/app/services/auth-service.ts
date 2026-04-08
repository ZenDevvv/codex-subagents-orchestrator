import { API_ENDPOINTS } from "~/configs/endpoints";
import { apiClient, type ApiResponse } from "~/lib/api-client";
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
} from "~/types/auth";

const { AUTH } = API_ENDPOINTS;

const getApiErrorMessage = (error: any, fallback: string) => {
	if (Array.isArray(error?.data?.errors) && error.data.errors.length > 0) {
		return error.data.errors[0].message;
	}

	return error?.data?.message || error?.message || fallback;
};

class AuthService {
	login = async (body: LoginRequest) => {
		try {
			const response: ApiResponse<LoginResponse> = await apiClient.post(AUTH.LOGIN, body);
			return response.data;
		} catch (error: any) {
			console.error("Error logging in:", error);
			throw new Error(getApiErrorMessage(error, "Error logging in"));
		}
	};

	logout = async () => {
		try {
			const response = await apiClient.post(AUTH.LOGOUT);
			return response.data;
		} catch (error: any) {
			console.error("Error logging out:", error);
			throw new Error(getApiErrorMessage(error, "Error logging out"));
		}
	};

	register = async (body: RegisterRequest) => {
		try {
			const response: ApiResponse<RegisterResponse> = await apiClient.post(AUTH.REGISTER, body);
			return response.data;
		} catch (error: any) {
			console.error("Error registering:", error);
			throw new Error(getApiErrorMessage(error, "Error registering"));
		}
	};
}

const authService = new AuthService();

export default authService;
