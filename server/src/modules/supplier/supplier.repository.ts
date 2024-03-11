import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Supplier } from './entities/supplier.entity'

@EntityRepository(Supplier)
export class SupplierRepository extends Repository<Supplier> {
  constructor(private readonly dataSource: DataSource) {
    super(Supplier, dataSource.createEntityManager())
  }
}
