import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorFormatter implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        const error = this.mapHttpError(err);

        return throwError(error);
      }),
    );
  }

  mapHttpError(err: any) {
    const data = err.message;
    const stack = process.env.NODE_ENV === 'dev' ? err.stack : undefined;

    if (err instanceof HttpException) {
      if (err instanceof InternalServerErrorException) {
        return new InternalServerErrorException({
          status: false,
          data,
          stack,
        });
      }

      return err;
    }

    return new UnprocessableEntityException({
      status: false,
      data,
      stack,
    });
  }
}
