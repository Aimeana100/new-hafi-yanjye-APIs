import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Faq } from './entities/faq.entity'
@EntityRepository(Faq)
export class FaqRepository extends Repository<Faq> {
  constructor(private readonly dataSource: DataSource) {
    super(Faq, dataSource.createEntityManager())
  }
}
