// province.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { District } from './district.entity'
import { Site } from './site.entity'
// import { Site } from './site.entity'
@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => District, (district) => district.province)
  district: District[]

  @OneToMany(() => Site, (site) => site.province)
  site: Site[]
}
