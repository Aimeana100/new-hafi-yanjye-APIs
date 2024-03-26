import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryRepository } from './categories.repository'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto)
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: {
        products: {
          images: true,
        },
      },
    })
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({
      where: { id: id },
      relations: {
        products: {
          images: true,
        },
      },
    })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto)
  }

  remove(id: number) {
    return this.categoryRepository.delete({ id })
  }
}
