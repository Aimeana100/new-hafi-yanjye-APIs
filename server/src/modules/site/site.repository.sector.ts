import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Sector } from './entities/sector.entity'

@EntityRepository(Sector)
export class SectorRepository extends Repository<Sector> {
  constructor(private readonly dataSource: DataSource) {
    super(Sector, dataSource.createEntityManager())
  }
}
