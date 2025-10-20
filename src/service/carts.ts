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

  async IncreaseQuantity(id: number) {}
  async DecreaseQuantity(id: number) {}
}
