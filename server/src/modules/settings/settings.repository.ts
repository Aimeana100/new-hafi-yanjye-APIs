import { Setting } from './entities/settings.entity'
import { DataSource, EntityRepository, Repository } from 'typeorm'

@EntityRepository(Setting)
export class SettingsRepository extends Repository<Setting> {
  constructor(private readonly dataSource: DataSource) {
    super(Setting, dataSource.createEntityManager())
  }
}
