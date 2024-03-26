import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Category } from './entities/category.entity'

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager())
  }
}
