import { DataSource, EntityRepository, Repository } from 'typeorm'
import { District } from './entities/district.entity'

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {
  constructor(private readonly dataSource: DataSource) {
    super(District, dataSource.createEntityManager())
  }
}
