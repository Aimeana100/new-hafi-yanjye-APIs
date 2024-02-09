import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderDetails } from './order-details.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Supplier } from 'src/modules/supplier/entities/supplier.entity'

export enum ProcessStatuses {
  ASSIGNED = 'ASSIGNED',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',
}
@Entity()
export class OrderProcess {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orderItemId: number

  @Column({ default: ProcessStatuses.ASSIGNED })
  processStatus: ProcessStatuses

  @OneToMany(() => User, (user) => user.orderProcessor)
  agent: User

  @ManyToOne(() => OrderDetails, (orderDetails) => orderDetails.orderProcessor)
  orderItem: OrderDetails

  @OneToMany(() => Supplier, (supplier) => supplier.supplierOrder)
  supplier: Supplier
}