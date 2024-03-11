import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesService } from './categories.service'
import { ProductsService } from '../products/products.service'

describe('CategoriesService', () => {
  let service: CategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, ProductsService],
    }).compile()

    service = module.get<CategoriesService>(CategoriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
