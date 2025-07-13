// biome-ignore lint/style/useImportType: <é isso mesmo>
import { Product } from "../../entities/product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  list(): Promise<Product[]>;
  update(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
