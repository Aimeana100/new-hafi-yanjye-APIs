import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderDetails } from './order-details.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Coupon } from 'src/modules/coupons/entities/coupon.entity'
import { Site } from 'src/modules/site/entities/site.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  orderId: string

  @Column()
  orderDate: Date

  @Column({ default: 0 })
  total: number

  @Column()
  status: OrderStatus

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[]

  @ManyToOne(() => Coupon, (coupon) => coupon.order)
  coupon: Coupon

  @ManyToOne(() => User, (customer) => customer.orders)
  customer: User

  @ManyToOne(() => Site, (site) => site.orders)
  delivery_site: Site
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  PAID = 'PAID',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
}
