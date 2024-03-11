import { DataSource, EntityRepository, Repository } from 'typeorm'
import { ProductImage } from './entities/product-image.entity'

@EntityRepository(ProductImage)
export class ProductImageRepository extends Repository<ProductImage> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductImage, dataSource.createEntityManager())
  }
}
