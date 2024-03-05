import { Product } from '../../products/entities/product.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './order.entity'
import { OrderProcess } from './order-process.entity'

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quantity: number

  @Column()
  pricePerItem: number

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order

  @OneToMany(() => OrderProcess, (orderDetails) => orderDetails.orderItem)
  orderProcessor: OrderProcess
  @ManyToOne(() => Product, (product) => product.orders)
  product: Product
}
