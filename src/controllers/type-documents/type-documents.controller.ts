import { Controller, Get, Res, Request, HttpStatus } from '@nestjs/common';
import { TypeDocumentsService } from './type-documents.service';
import { Response } from 'express';

@Controller('type-documents')
export class TypeDocumentsController {
  constructor(private readonly typeDocumentsService: TypeDocumentsService) {}

  // @UseGuards( AuthGuard )
  @Get('/get-all-type-documents')
  async getAll(@Request() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const typeDocuments = await this.typeDocumentsService.getAll(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          typeDocuments: typeDocuments,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda tipo de documentos',
        error: error.message,
      });
    } 
  }
}
