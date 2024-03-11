// village.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
// import { Cell } from './cell.entity'

@Entity()
export class Village {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  //   @ManyToOne(() => Cell, (cell) => cell.villages)
  //   cell: Cell
}
