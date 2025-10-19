import type { AxiosInstance } from "axios";
import type { Orders, User } from "./store_type";
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

  async getUsersOrders(): Promise<Orders> {
    const { data } = await this.axios.get<ApiResponse<Orders>>("users/orders");
    return data?.data;
  }
}
