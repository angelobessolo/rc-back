import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, HttpStatus, UseGuards } from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/controllers/auth/guards/Auth.guard';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  // ********** Metodos Tipos Programa **********
  
  @UseGuards( AuthGuard )
  @Post('')
  async createTypeModality(@Request() req: Request, @Res() res: Response, @Body() CreateProgramDto: CreateProgramDto) {
    try {
      const user = req['user'];
      const typeModality = await this.programService.createProgram(CreateProgramDto, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Programa académico creado éxitosamente',
        data: {
          typeModality: typeModality,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de la creacion de modalidad',
        error: error.message,
      });
    }
  }

  // @UseGuards( AuthGuard )
  @Get('/get-all-programs')
  async getAllPrograms(@Res() res: Response) {
    try {
      const programs = await this.programService.getAllPrograms();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada éxitosamente',
        data: {programs},
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }

  @UseGuards( AuthGuard )
  @Get('/get-all-programs-list')
  async getAllProgramsList(@Res() res: Response) {
    try {
      const programs = await this.programService.getAllProgramsList();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada éxitosamente',
        data: programs,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }
}
