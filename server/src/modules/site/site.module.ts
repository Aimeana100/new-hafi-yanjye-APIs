import { Module } from '@nestjs/common'
import {
  DistrictService,
  ProvinceService,
  SectorService,
  SiteService,
} from './site.service'
import {
  DistrictController,
  ProvinceController,
  SectorController,
  SiteController,
} from './site.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Site } from './entities/site.entity'
import { SiteRepository } from './site.repository'
import { ProvinceRepository } from './site.repository.province'
import { District } from './entities/district.entity'
// import { Cell } from './entities/cell.entity'
import { Village } from './entities/village.entity'
import { Province } from './entities/province.entity'
import { SectorRepository } from './site.repository.sector'
import { DistrictRepository } from './site.repository.district'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Site,
      District,
      Province,
      // Cell,
      Village,
      SiteRepository,
      SectorRepository,
      ProvinceRepository,
    ]),
  ],
  controllers: [
    SiteController,
    ProvinceController,
    DistrictController,
    SectorController,
  ],
  providers: [
    SiteService,
    SectorService,
    ProvinceService,
    SiteRepository,
    SectorRepository,
    DistrictRepository,
    DistrictService,
    ProvinceRepository,
  ],
})
export class SiteModule {}
