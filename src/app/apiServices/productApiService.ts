import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { serverApi } from "../../lib/config";
import { Product } from "../../types/product";
import { ProductSearchObj } from "../../types/others";

class ProductApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTargetProducts(data: ProductSearchObj) { //
    try {
      const url = "/products";
      const result = await axios.post(this.path + url,  data, { //
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERR::: getTargetProducts ${err.message}`);
      throw err;
    }
  }
}

export default ProductApiService;