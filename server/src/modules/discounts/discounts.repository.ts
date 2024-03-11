import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Discount } from './entities/discount.entity'

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {
  constructor(private readonly dataSource: DataSource) {
    super(Discount, dataSource.createEntityManager())
  }
}
