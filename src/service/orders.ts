import type { AxiosInstance } from "axios";
import type { Order, OrderCreate } from "./store_type";
import type { ApiResponse } from "./axios/type";

export class OrdersService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async CreateOrder(
    payload: {
      alternative_phone_number?: string;
      cart_ids: number[];
      city: string;
      customer_email: string;
      customer_name: string;
      phone_number: string;
      street: string;
    },
    header: {
      X_Idempotency_Key: string;
    },
  ): Promise<OrderCreate> {
    const response = await this.axios.post<ApiResponse<OrderCreate>>(
      "orders",
      payload,
      {
        headers: {
          "X-Idempotency-Key": header.X_Idempotency_Key,
        },
      },
    );

    return response.data.data;
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
