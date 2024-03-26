// src/filters/error.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Request, Response } from 'express'
import { logger } from '../config/logger'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    logger.error(`Unhandled Exception: ${exception.message}`, exception.stack)
    response.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Internal Server Error',
    })
  }
}
