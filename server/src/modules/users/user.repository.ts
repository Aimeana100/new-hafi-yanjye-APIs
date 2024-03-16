import { DataSource, EntityRepository, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { NotFoundException } from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  getUserByEmail(email: string): Promise<User> {
    const user = this.findOne({ where: { email } })
    return user
  }
  getUserById(id: number): Promise<User> {
    const user = this.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
}
