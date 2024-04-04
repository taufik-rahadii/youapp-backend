import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export class SuccessResponse {
  constructor(obj: SuccessResponse) {
    Object.assign(this, obj);
  }

  status: string;
  message: string;
  data: any;
}

@Injectable()
export class ResponseFormatter {
  constructor(private readonly reflector: Reflector) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<SuccessResponse> | Promise<Observable<SuccessResponse>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof SuccessResponse) return data;

        const responseDto = this.reflector.get<ClassConstructor<unknown>>(
          'DTO_CLASS',
          context.getHandler(),
        );

        const responseCode =
          this.reflector.get<string>('RES_CODE', context.getHandler()) ??
          '0000';

        let resData = data;

        if (!responseDto)
          return new SuccessResponse({
            status: responseCode,
            message: 'Success',
            data: resData,
          });

        resData = plainToInstance(responseDto, resData, {
          strategy: 'excludeAll',
          exposeDefaultValues: false,
          exposeUnsetFields: false,
        });

        const res = new SuccessResponse({
          message: 'Success',
          status: responseCode,
          data: resData,
        });

        Logger.debug(`${JSON.stringify(res)}`, 'IncomingRequest.RESPONSE');

        return res;
      }),
    );
  }

  parseResponseMessage(response: Response) {
    const statusCode = response.statusCode;

    return Object.keys(HttpStatus).find(
      (status) => HttpStatus[status as keyof typeof HttpStatus] === statusCode,
    );
  }
}
