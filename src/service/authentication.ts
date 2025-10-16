import type { AxiosInstance } from "axios";
import type { ApiResponse, LoginRequest, RegisterRequest } from "./axios/type";
import type { Login, Register } from "./store_type";

export class AuthenticationService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async login(payload: LoginRequest): Promise<Login> {
    const response = await this.axios.post<ApiResponse<Login>>(
      "authentication/sign-in",
      payload,
    );

    if (response.data?.data.user.role_name !== "customer") {
      throw new Error("Something went wrong. Please try again later.");
    }

    return response.data.data;
  }

  async register(payload: RegisterRequest): Promise<Login> {
    const signUpResponse = await this.axios.post<ApiResponse<Register>>(
      "authentication/sign-up",
      payload,
    );

    const activationResponse = await this.axios.post<ApiResponse<string>>(
      `authentication/activation/${signUpResponse.data.data.token}`,
    );

    if (!activationResponse.data.data) {
      throw new Error("Activation failed — no token received.");
    }

    const loginResponse = await this.login({
      email: payload.email,
      password: payload.password,
    });

    return loginResponse;
  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
}
