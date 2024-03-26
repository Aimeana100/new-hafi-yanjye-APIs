import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ nullable: true })
  name: string
  @Column()
  link: string
  @ManyToOne(() => Product, (product) => product.images)
  product: Product
}
