import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './application/app.module';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as morgan from 'morgan';
import { ResponseFormatter } from './core/interceptors/success.interceptor';
import { ErrorFormatter } from './core/interceptors/error.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appLogger = new Logger('NestApplication');
  const reqLogger = new Logger('IncomingRequest');

  app.useGlobalInterceptors(new ErrorFormatter());
  app.useGlobalInterceptors(new ResponseFormatter(new Reflector()));
  app.setGlobalPrefix('/api');

  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => reqLogger.verbose(message),
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: validationPipeExceptionFactory,
    }),
  );

  const swaggerConfig = new DocumentBuilder().build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDoc);

  const port = 8080; // default port
  await app.listen(port);
  appLogger.log(`Application is running on port ${port}`);
}

function validationPipeExceptionFactory(errors: ValidationError[]) {
  const messages = errors.map((error) => {
    const { property, constraints } = error;

    const keys = Object.keys(constraints);

    const msgs: string[] = [];

    keys.forEach((key) => {
      msgs.push(`${constraints[key]}`);
    });

    return {
      property,
      errors: msgs,
    };
  });

  throw new UnprocessableEntityException(messages);
}

bootstrap();
