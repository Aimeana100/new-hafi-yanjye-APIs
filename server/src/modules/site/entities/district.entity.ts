// district.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Province } from './province.entity'
import { Sector } from './sector.entity'
import { Site } from './site.entity'

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Province, (province) => province.district)
  province: Province

  @OneToMany(() => Sector, (sector) => sector.district)
  sectors: Sector[]

  @OneToMany(() => Site, (site) => site.district)
  site: Site[]
}
