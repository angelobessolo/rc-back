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

      // Si viene de class-validator (errores DTO)
      if (Array.isArray(responseObject.message)) {
        error = responseObject.message.join(', ');
      } else {
        error = responseObject.message || 'Error';
      }

      // Puedes usar un mensaje por defecto para cada tipo de error
      // message = responseObject.error || 'Error en la operación';
    }
  } else if (exception instanceof Error) {
    error = exception.message;
  }

  response.status(status).json({
    statusCode: status,
    message, // Título del error
    error,   // Detalle del error
  });
  }
}
  