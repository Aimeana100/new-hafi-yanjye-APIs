import { DataSource, EntityRepository, Repository } from 'typeorm'
import { ProductReview } from './entities/product-review.entity'

@EntityRepository(ProductReview)
export class ProductReviewRepository extends Repository<ProductReview> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductReview, dataSource.createEntityManager())
  }
}
