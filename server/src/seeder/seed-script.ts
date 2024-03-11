// src/scripts/seed-script.ts
import { NestFactory } from '@nestjs/core'
import { Connection } from 'typeorm'
import { AppModule } from '../app.module' // adjust the path as needed

import provincesData from './data/address'
import { Province } from '../modules/site/entities/province.entity'
import { District } from '../modules/site/entities/district.entity'
import { Sector } from '../modules/site/entities/sector.entity'
// import { Cell } from '../modules/site/entities/cell.entity'
// import { Village } from '../modules/site/entities/village.entity'
const seedData = async () => {
  const app = await NestFactory.createApplicationContext(AppModule)

  //   const connectionOptions = await getConnectionOptions()
  // const connection = await TypeOrmModule.forRoot({
  //   ...connectionOptions,
  //   synchronize: true, // Set to true for development, but be cautious in production
  // })

  const appContext = app.select(AppModule)
  const typeOrmConnection = appContext.get(Connection)

  for (const [provinceName, districtsData] of Object.entries(provincesData)) {
    const province = await typeOrmConnection.manager.save(Province, {
      name: provinceName,
    })

    for (const [districtName, sectorsData] of Object.entries(districtsData)) {
      const district = await typeOrmConnection.manager.save(District, {
        name: districtName,
        province,
      })

      for (const [sectorName] of Object.entries(sectorsData)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sector = await typeOrmConnection.manager.save(Sector, {
          name: sectorName,
          district,
        })

        // for (const [cellName, villagesData] of Object.entries(cellsData)) {
        //   const cell = await typeOrmConnection.manager.save(Cell, {
        //     name: cellName,
        //     sector,
        //   })

        //   for (const villageName of villagesData) {
        //     await typeOrmConnection.manager.save(Village, {
        //       name: villageName,
        //       cell,
        //     })
        //   }
        // }
      }
    }
  }

  await app.close()
}

seedData()
