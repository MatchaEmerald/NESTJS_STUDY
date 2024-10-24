import {
  ExceptionFilter,
  Catch,
  ArgumentMetadata,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();

    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    response.status(status).json({
      status,
      success: false,
      time: new Date(),
      path: request.url,
      data: exception.message,
    });
  }
}
