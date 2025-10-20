import type { AxiosInstance } from "axios";
import type { Order } from "./store_type";
import type { ApiResponse } from "./axios/type";

export class OrdersService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async GetOrderDetail(id: string): Promise<Order> {
    const response = await this.axios.get<ApiResponse<Order>>(`orders/${id}`);
    return response.data.data;
  }

  async CompleteOrder(id: string): Promise<string> {
    const response = await this.axios.patch<ApiResponse<string>>(
      `orders/${id}/complete`,
    );
    return response.data.data;
  }

  async CancelOrder(id: string): Promise<string> {
    const response = await this.axios.patch<ApiResponse<string>>(
      `orders/${id}/cancel`,
    );
    return response.data.data;
  }
}
