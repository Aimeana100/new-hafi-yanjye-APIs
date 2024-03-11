import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Product } from './entities/product.entity'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager())
  }

  getProductByName(name: string): Promise<Product> {
    const product = this.findOne({ where: { name } })
    return product
  }
}
