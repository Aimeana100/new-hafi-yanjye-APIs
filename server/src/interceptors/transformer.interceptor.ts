// transform.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { classToPlain } from 'class-transformer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest()

        if (request.is('multipart/form-data')) {
          // Transform the form-data/multipart payload
          return classToPlain(data)
        }

        return data
      }),
    )
  }
}
