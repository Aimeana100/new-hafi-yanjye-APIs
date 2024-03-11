import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProvinceRepository } from './site.repository.province'
import { SiteRepository } from './site.repository'
import { SectorRepository } from './site.repository.sector'
import { DistrictRepository } from './site.repository.district'

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(SiteRepository) private siteRepository: SiteRepository,
    @InjectRepository(ProvinceRepository)
    private provinceRepository: ProvinceRepository,
    @InjectRepository(SectorRepository)
    private sectorRepository: SectorRepository,
    @InjectRepository(DistrictRepository)
    private districtRepository: DistrictRepository,
  ) {}

  async create(createSiteDto: CreateSiteDto) {
    const sector = await this.sectorRepository.findOne({
      where: { id: createSiteDto.sector },
      relations: {
        district: {
          province: true,
        },
      },
    })
    if (!sector) {
      throw new NotFoundException('Sector not found')
    }
    const province = await this.provinceRepository.findOne({
      where: { id: sector.district.province.id },
    })
    const district = await this.districtRepository.findOne({
      where: { id: sector.district.id },
    })

    const site = this.siteRepository.create({
      ...createSiteDto,
      sector,
      province,
      district,
    })
    return this.siteRepository.save(site)
  }

  findAll() {
    return this.siteRepository.find()
  }

  findOne(id: number) {
    return this.siteRepository.findOne({ where: { id } })
  }

  findByProvince(id: number) {
    return this.siteRepository.find({
      where: {
        sector: {
          district: {
            province: {
              id,
            },
          },
        },
      },
    })
  }
  findByDistrict(id: number) {
    return this.siteRepository.find({
      where: {
        sector: {
          district: {
            id,
          },
        },
      },
    })
  }
  findBySector(id: number) {
    return this.siteRepository.find({
      where: {
        sector: {
          id,
        },
      },
    })
  }

  async update(id: number, updateSiteDto: UpdateSiteDto) {
    const site = await this.siteRepository.findOne({ where: { id } })

    if (site) {
      throw new NotFoundException(`Site with id ${id} does not exist`)
    }
    const sector = await this.sectorRepository.findOne({
      where: { id: updateSiteDto.sector ?? undefined },
      relations: {
        district: {
          province: true,
        },
      },
    })

    if (!sector) {
      throw new NotFoundException('Sector not found')
    }
    const province = await this.provinceRepository.findOne({
      where: { id: sector.district.province.id },
    })
    const district = await this.districtRepository.findOne({
      where: { id: sector.district.id },
    })

    const siteObj = { ...site, ...updateSiteDto, district, province, sector }
    const siteEntity = await this.siteRepository.create(siteObj)
    return this.siteRepository.update(id, siteEntity)
  }

  remove(id: number) {
    return `This action removes a #${id} site`
  }
}

/**
 * Province service
 */
@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(ProvinceRepository)
    private provinceRepository: ProvinceRepository,
  ) {}
  findAll() {
    return this.provinceRepository.find()
  }
}

/**
 * District service
 */
@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(DistrictRepository)
    private districtRepository: DistrictRepository,
    @InjectRepository(DistrictRepository)
    private provinceRepository: ProvinceRepository,
  ) {}
  findAll() {
    return this.districtRepository.find()
  }
  async findAllByProvince(id: number) {
    const province = await this.provinceRepository.findOne({
      where: { id },
    })

    if (!province) {
      throw new NotFoundException(`Province with Id: ${id} not found`)
    }

    return this.districtRepository.find({
      where: {
        province: {
          id,
        },
      },
    })
  }
}

/**
 * Sector service
 */
@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(SectorRepository)
    private sectorRepository: SectorRepository,
    @InjectRepository(DistrictRepository)
    private districtRepository: DistrictRepository,
  ) {}
  findAll() {
    return this.sectorRepository.find()
  }

  async findAllByDistrict(id: number) {
    const district = await this.districtRepository.findOne({ where: { id } })
    if (!district) {
      throw new NotFoundException(`District with Id: ${id} not found`)
    }
    return this.sectorRepository.find({
      where: {
        district: {
          id,
        },
      },
    })
  }
}
