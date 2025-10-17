import type { AxiosInstance } from "axios";
import type { Beans, Forms, Product, Products } from "./store_type";
import type { ApiResponse } from "./axios/type";

export class InventoryService {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async GetProducts(
    bean?: number,
    form?: number,
    sort?: "asc" | "desc",
    limit?: number,
    offset?: number,
  ): Promise<Products> {
    const params = new URLSearchParams();
    if (bean) params.append("bean", String(bean));
    if (form) params.append("form", String(form));
    if (sort) params.append("sort", sort);
    if (offset !== undefined) params.append("offset", offset.toString());
    if (limit !== undefined) params.append("limit", limit.toString());

    const queryString = params.toString();
    const url = queryString ? `products?${queryString}` : "products/";

    const result = await this.axios.get<ApiResponse<Products>>(url);
    return result.data?.data ?? [];
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
