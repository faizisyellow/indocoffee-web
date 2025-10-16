import type { AxiosInstance } from "axios";
import type { User } from "./store_type";
import type { ApiResponse } from "./axios/type";

export class ProfileService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getProfile(): Promise<User> {
    const { data } = await this.axios.get<ApiResponse<User>>("users/profile");
    return data?.data;
  }
}
