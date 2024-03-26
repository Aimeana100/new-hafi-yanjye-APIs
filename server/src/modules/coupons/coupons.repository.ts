import { DataSource, EntityRepository, Repository } from 'typeorm'
import { Coupon } from './entities/coupon.entity'

@EntityRepository(Coupon)
export class CouponRepository extends Repository<Coupon> {
  constructor(private readonly dataSource: DataSource) {
    super(Coupon, dataSource.createEntityManager())
  }
}
