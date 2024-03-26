import { Order } from '../../orders/entities/order.entity'
import { Product } from '../../products/entities/product.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  startAt: Date

  @Column()
  endAt: Date

  @Column()
  rate: number

  @Column()
  minItems: number

  @Column()
  timeUsage: number

  @Column()
  minCost: number

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]

  @OneToMany(() => Order, (order) => order.coupon)
  order: Order
}
