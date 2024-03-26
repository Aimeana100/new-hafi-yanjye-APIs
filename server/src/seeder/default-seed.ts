import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { BcryptService } from '../modules/auth/bcrypt.service'
import { Role, User } from '../modules/users/entities/user.entity'
import { Connection } from 'typeorm'

export const defaultSeed = async () => {
  const bcryptService = new BcryptService()
  const app = await NestFactory.createApplicationContext(AppModule)
  const appContext = app.select(AppModule)
  const typeOrmConnection = appContext.get(Connection)

  const userExist = await typeOrmConnection.manager.findOne(User, {
    where: {
      email: 'admin@gmail.com',
    },
  })

  if (!userExist) {
    await typeOrmConnection.manager.save(User, {
      fullName: 'Anathole',
      telephone: '07856475',
      role: Role.ADMIN,
      email: 'admin@gmail.com',
      password: await bcryptService.hash('12345678'),
    })
  }

  await app.close()
}

defaultSeed()
