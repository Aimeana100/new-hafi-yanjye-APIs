import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Document } from './entities/document.entity'

@EntityRepository(Document)
export class DocumentRepository extends Repository<Document> {
  constructor(private readonly dataSource: DataSource) {
    super(Document, dataSource.createEntityManager())
  }
}
