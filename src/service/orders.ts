import type { AxiosInstance } from "axios";
import type { Orders } from "./store_type";
import type { ApiResponse } from "./axios/type";

export class OrdersService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async GetAllOrders(): Promise<Orders> {
    const response = await this.axios.get<ApiResponse<Orders>>("orders");
    return response.data.data;
  }
}
