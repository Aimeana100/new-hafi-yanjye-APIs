import { Test, TestingModule } from '@nestjs/testing'
import { SiteService } from './site.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { SiteRepository } from './site.repository'
import { ProvinceRepository } from './site.repository.province'
import { SectorRepository } from './site.repository.sector'
import { DistrictRepository } from './site.repository.district'
// import { CreateSiteDto } from './dto/create-site.dto'
// import { NotFoundException } from '@nestjs/common'

describe('SiteService', () => {
  let service: SiteService
  // let siteRepositoryMock: jest.Mocked<SiteRepository>
  // let provinceRepositoryMock: jest.Mocked<ProvinceRepository>
  let sectorRepositoryMock: jest.Mocked<SectorRepository>
  // let districtRepositoryMock: jest.Mocked<DistrictRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SiteService,
        {
          provide: getRepositoryToken(SiteRepository),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProvinceRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(SectorRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(DistrictRepository),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<SiteService>(SiteService)
    // siteRepositoryMock = module.get(getRepositoryToken(SiteRepository))
    // provinceRepositoryMock = module.get(getRepositoryToken(ProvinceRepository))
    sectorRepositoryMock = module.get(getRepositoryToken(SectorRepository))
    // districtRepositoryMock = module.get(getRepositoryToken(DistrictRepository))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a site', async () => {
      // const createSiteDto: CreateSiteDto = {
      //   name: 'site 1',
      //   description: 'description',
      // }
      // const expectedResult = {} // Provide the expected result after saving
      // Mocking the necessary repository methods
      // siteRepositoryMock.create.mockReturnValue(createSiteDto)
      // siteRepositoryMock.save.mockReturnValue(expectedResult)
      // const result = await service.create(createSiteDto)
      // Assertions
      // expect(result).toEqual(expectedResult)
      // expect(siteRepositoryMock.create).toHaveBeenCalledWith(createSiteDto)
      // expect(siteRepositoryMock.save).toHaveBeenCalledWith(createSiteDto)
    })

    it('should throw NotFoundException if sector not found', async () => {
      // Mocking scenario where sector is not found
      sectorRepositoryMock.findOne.mockReturnValue(undefined)

      // await expect(service.create({ sector: 1 })).rejects.toThrowError(
      //   NotFoundException,
      // )
    })

    // Add more tests for other scenarios in the create method
  })

  // Add tests for other methods in SiteService
})
