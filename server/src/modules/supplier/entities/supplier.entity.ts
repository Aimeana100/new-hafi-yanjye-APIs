import { User } from '../../users/entities/user.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderProcess } from '../../orders/entities/order-process.entity'

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  tinNumber: string

  @Column({ nullable: true })
  email: string

  @ManyToOne(() => User, (user) => user.supplier, { nullable: false })
  createdBy: User

  @OneToMany(() => OrderProcess, (supplierOrder) => supplierOrder.supplier)
  supplierOrder: OrderProcess
}
