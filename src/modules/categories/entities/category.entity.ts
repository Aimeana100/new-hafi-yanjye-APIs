import { Product } from '../../products/entities/product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column({ nullable: true })
  description: string
  @Column({
    nullable: true,
  })
  image: string

  @OneToMany(() => Product, (produc) => produc.category)
  products: Product[]
}
