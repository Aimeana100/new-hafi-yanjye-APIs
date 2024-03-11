import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderDetails } from './order-details.entity'
import { User } from '../../users/entities/user.entity'
import { Supplier } from '../../supplier/entities/supplier.entity'

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

  @Column({ nullable: true })
  agentId: number

  @Column({ default: ProcessStatuses.ASSIGNED })
  processStatus: ProcessStatuses

  // @OneToMany(() => User, (user) => user.orderProcessor, { nullable: false })
  // agent: User

  @ManyToOne(() => User, (user) => user.orderProcessor)
  @JoinColumn({ name: 'agentId' })
  agent: User

  @ManyToOne(() => OrderDetails, (orderDetails) => orderDetails.orderProcessor)
  orderItem: OrderDetails

  @OneToMany(() => Supplier, (supplier) => supplier.supplierOrder)
  supplier: Supplier
}
