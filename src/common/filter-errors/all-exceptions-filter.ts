import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
  
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();

  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Error al procesar la solicitud';
  let error = 'Error interno del servidor';

  if (exception instanceof HttpException) {
    status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      error = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      const responseObject = exceptionResponse as any;

      // If come from class-validator (DTO errors)
      if (Array.isArray(responseObject.message)) {
        error = responseObject.message.join(', ');
      } else {
        error = responseObject.message || 'Error';
      }
    }
  } else if (exception instanceof Error) {
    error = exception.message;
  }

  response.status(status).json({
    statusCode: status,
    message, // Title error
    error,   // Detail error
  });
  }
}
  