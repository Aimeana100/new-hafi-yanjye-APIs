// sector.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { District } from './district.entity'
// import { Cell } from './cell.entity'
import { Site } from './site.entity'

@Entity()
export class Sector {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => District, (district) => district.sectors)
  district: District

  // @OneToMany(() => Cell, (cell) => cell.sector)
  // cells: Cell[]

  @OneToMany(() => Site, (site) => site.sector)
  site: Site[]
}
