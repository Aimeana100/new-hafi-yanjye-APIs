import { DataSource, EntityRepository, Repository } from 'typeorm'
import { User } from './entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  getUserByEmail(email: string): Promise<User> {
    const user = this.findOne({ where: { email } })
    return user
  }
}
