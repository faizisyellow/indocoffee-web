import type { AxiosInstance } from "axios";
import type { Orders, User, UsersCarts } from "./store_type";
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

  async getUsersOrders(
    status?: "confirm" | "roasting" | "shipped" | "complete" | "cancelled" | "",
    sort?: "asc" | "desc",
    limit?: number,
    offset?: number,
  ): Promise<Orders> {
    const params = new URLSearchParams();
    if (status != undefined || status !== "")
      params.append("status", String(status));
    if (sort) params.append("sort", sort);
    if (offset !== undefined) params.append("offset", offset.toString());
    if (limit !== undefined) params.append("limit", limit.toString());

    const queryString = params.toString();
    const url = queryString ? `users/orders?${queryString}` : "users/orders";

    const { data } = await this.axios.get<ApiResponse<Orders>>(url);
    return data?.data;
  }

  async GetUsersCarts(): Promise<UsersCarts> {
    const response =
      await this.axios.get<ApiResponse<UsersCarts>>("users/cart");
    return response.data.data;
  }
}
