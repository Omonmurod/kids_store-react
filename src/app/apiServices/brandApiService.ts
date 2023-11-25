import axios from "axios";
import assert from "assert";
import { Brand } from "../../types/user";
import { SearchObj } from "../../types/others";
import { Definer } from "../../lib/Definer";
import { serverApi } from "../../lib/config";
import { Product } from "../../types/product";

class BrandApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTopBrands() {
    try {
      const url = "/brands?order=top&page=1&limit=4",
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const top_brands: Brand[] = result.data.data;
      return top_brands;
    } catch (err: any) {
      console.log(`ERR::: getTopBrands ${err.message}`);
      throw err;
    }
  }

  async getBrands(data: SearchObj) {
    try {
      const url = `/brands?order=${data.order}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const Brands: Brand[] = result.data.data;
      return Brands;
    } catch (err: any) {
      console.log(`ERR::: getBrands ${err.message}`);
      throw err;
    }
  }

  async getChosenBrand(id: string) {
    try {
      const url = `/brands/${id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const Brand: Brand = result.data.data;
      return Brand;
    } catch (err: any) {
      console.log(`ERR::: getChosenBrand ${err.message}`);
      throw err;
    }
  }
}

export default BrandApiService;
