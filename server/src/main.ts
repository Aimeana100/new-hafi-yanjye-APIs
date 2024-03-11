import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { config, customOptions } from './config/swagger.config'
import { ValidationPipe } from '@nestjs/common'
import { defaultSeed } from './seeder/default-seed'
// import { GlobalExceptionFilter } from './filters/error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  // Register the global exception filter
  // app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  })
  SwaggerModule.setup('docs', app, document, customOptions)
  await app.listen(parseInt(process.env.PORT) || 5000)
  defaultSeed()
}
bootstrap()
