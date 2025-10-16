import type { AxiosInstance } from "axios";
import type { Beans, Forms, Product, Products } from "./store_type";
import type { ApiResponse } from "./axios/type";

export class InventoryService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async GetProducts(filter: {
    bean: string;
    form: string;
    offset: number;
    limit: number;
    sort: "asc" | "desc";
  }): Promise<Products> {
    const result = await this.axios.get<ApiResponse<Products>>("products");
    return result.data?.data;
  }

  async GetProduct(id: number): Promise<Product> {
    const result = await this.axios.get<ApiResponse<Product>>(`products/${id}`);
    return result.data?.data;
  }

  async GetBeans(): Promise<Beans> {
    const result = await this.axios.get<ApiResponse<Beans>>("beans");
    return result.data?.data;
  }

  async GetForms(): Promise<Forms> {
    const result = await this.axios.get<ApiResponse<Forms>>("forms");
    return result.data?.data;
  }
}
