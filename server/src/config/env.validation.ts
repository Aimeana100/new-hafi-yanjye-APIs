import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'
import { logger } from './logger'

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  DB_HOST: string
  DB_PORT: number

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string

  @IsNotEmpty()
  @IsString()
  DB_NAME: string

  @IsNotEmpty()
  @IsString()
  MAIL_NAME: string

  @IsNotEmpty()
  @IsString()
  MAIL_PASS: string

  @IsNotEmpty()
  @IsString()
  FRONTEND: string

  @IsNotEmpty()
  @IsString()
  SSL_ALLOWED: string

  @IsNotEmpty()
  @IsString()
  PORT: string
}

export function validate(config: Record<string, unknown>) {
  const validateCOnfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validateCOnfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    logger.error(`Environment variable validation failed: ${errors.toString()}`)
    throw new Error(errors.toString())
  }

  return validateCOnfig
}
