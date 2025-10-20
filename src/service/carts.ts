import type { AxiosInstance } from "axios";
import type { ApiResponse } from "./axios/type";

export class CartsService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async AddCart(id: number): Promise<string> {
    const payload = { product_id: id };

    const response = await this.axios.post<ApiResponse<string>>(
      "carts",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.data;
  }

  async IncreaseQuantity(id: number): Promise<string> {
    const response = await this.axios.patch<ApiResponse<string>>(
      `carts/${id}/increment`,
    );

    return response.data.data;
  }
  async DecreaseQuantity(id: number) {
    const response = await this.axios.patch<ApiResponse<string>>(
      `carts/${id}/decrement`,
    );

    return response.data.data;
  }

  async DeleteCart(id: number) {
    await this.axios.delete(`carts/${id}`);
  }
}
