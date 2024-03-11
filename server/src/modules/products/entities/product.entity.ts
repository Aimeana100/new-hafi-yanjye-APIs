import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ProductImage } from './product-image.entity'
import { Category } from '../../categories/entities/category.entity'
import { OrderDetails } from '../../orders/entities/order-details.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column({
    type: 'text',
  })
  description: string
  @Column()
  price: number
  @Column()
  cost: number
  @Column()
  quatity: number

  @Column({ nullable: true })
  datasheet_link: string

  @Column({ nullable: true })
  video_link: string

  @DeleteDateColumn()
  delete: Date

  @CreateDateColumn()
  createAt: Date

  @OneToMany(() => ProductImage, (images) => images.product, { cascade: true })
  images: ProductImage[]
  @ManyToOne(() => Category, (category) => category.products)
  category: Category
  @ManyToOne(() => OrderDetails, (order) => order.product)
  orders: OrderDetails[]
}
