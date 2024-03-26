// // cell.entity.ts
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
// } from 'typeorm'
// import { Sector } from './sector.entity'
// import { Village } from './village.entity'
// import { Site } from './site.entity'

// @Entity()
// export class Cell {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column()
//   name: string

//   @ManyToOne(() => Sector, (sector) => sector.cells)
//   sector: Sector

//   @OneToMany(() => Village, (village) => village.cell)
//   villages: Village[]

//   @OneToMany(() => Site, (site) => site.cell)
//   site: Site[]
// }
