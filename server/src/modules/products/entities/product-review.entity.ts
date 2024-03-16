import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from './product.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 0 })
  rating: number

  @Column({ length: 255 })
  comment: string

  @DeleteDateColumn()
  deletedAt: Date

  @CreateDateColumn()
  createAt: Date

  @ManyToOne(() => Product, (product) => product.ratings)
  product: Product

  @ManyToOne(() => User, (user) => user.ratings)
  rater: User
}
