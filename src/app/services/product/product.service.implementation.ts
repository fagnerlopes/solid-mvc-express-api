/** biome-ignore-all lint/style/useImportType: <é assim> */
import { ProductRepository } from "../../repositories/product/product.repository";
import type {
  BuyOutputDto,
  ListOutputDto,
  ProductService,
  SellOutputDto,
} from "./product.service";

export class ProductServiceImplementation implements ProductService {
  private constructor(readonly repository: ProductRepository) {}

  public async sell(id: string, amount: number): Promise<SellOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error(`O produto ${id} não foi encontrado`);
    }

    aProduct.sell(amount);

    await this.repository.update(aProduct);

    const output: SellOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity,
    };

    return output;
  }

  public async buy(id: string, amount: number): Promise<BuyOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error(`O produto ${id} não foi encontrado`);
    }

    aProduct.buy(amount);

    await this.repository.update(aProduct);

    const output: BuyOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity,
    };

    return output;
  }

  public async list(): Promise<ListOutputDto> {
    const aProducts = await this.repository.list();

    if (!aProducts) {
      throw new Error(`Não existem produtos cadastrados`);
    }

    const products = aProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        balance: product.quantity,
      };
    });

    const output: ListOutputDto = { products };

    return output;
  }
}
