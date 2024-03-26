import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
@Entity()
export class Faq {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  question: string

  @Column({ length: 255 })
  answer: string

  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
