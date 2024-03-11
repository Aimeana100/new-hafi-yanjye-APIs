import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Hafi Yanjye')
  .setDescription('The  REST API Documentation, describe the main endpoits')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    defaultModelsExpandDepth: -1,
    initOAuth: {
      clientId: 'id',
      usePkceWithAuthorizationCodeGrant: true,
    },
  },
}
