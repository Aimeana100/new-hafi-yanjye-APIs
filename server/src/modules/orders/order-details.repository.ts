import { DataSource, EntityRepository, Repository } from 'typeorm'
import { OrderDetails } from './entities/order-details.entity'

@EntityRepository(OrderDetails)
export class OrderDetailsRepository extends Repository<OrderDetails> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderDetails, dataSource.createEntityManager())
  }
}
