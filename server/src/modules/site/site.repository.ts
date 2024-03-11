import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Site } from './entities/site.entity'
@EntityRepository(Site)
export class SiteRepository extends Repository<Site> {
  constructor(private readonly dataSource: DataSource) {
    super(Site, dataSource.createEntityManager())
  }
}
