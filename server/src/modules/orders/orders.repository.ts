import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Order } from './entities/order.entity'
import { NotFoundException } from '@nestjs/common'

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager())
  }
  findById(id: number) {
    const order = this.findOne({ where: { id } })
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`)
    }
    return order
  }
}
