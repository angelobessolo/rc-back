import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import {Response} from 'express';
import { AuthGuard } from 'src/controllers/auth/guards/Auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTypeProgramDto } from './dto/create-type-program.dto';
import { CreateTypeModalityDto } from './dto/create-type-modality.dto';
import { UpdateProgramTypeDto } from './dto/update-program-type.dto';
import { UpdateModalityTypeDto } from './dto/update-modality-type.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ********** Metodos Documentos **********
  @UseGuards( AuthGuard )
  @Post('/document')
  public async createDocument(@Request() req: Request, @Res() res: Response, @Body() createDocumentDto: CreateDocumentDto) {
    try {
      const user = req['user'];
      const document = await this.adminService.createDocument(createDocumentDto, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Tipo Documento creado con éxito',
        data: {
          document: document,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de la creacion de coordinación',
        error: error.message,
      });
    }
  }

  @UseGuards( AuthGuard )
  @Get('/document/:id')
  public async getDocument(@Request() req: Request, @Res() res: Response, @Param('id') id: number) {
    try {
      const user = req['user'];
      const document = await this.adminService.getDocument(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          document: document,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    } 
  }

  // ********** Metodos Paises **********
  // @UseGuards( AuthGuard )
  // @Post('/document')
  // async createDocument(@Request() req: Request, @Res() res: Response, @Body() createDocumentDto: CreateDocumentDto) {
  //   try {
  //     const user = req['user'];
  //     const document = await this.adminService.createDocument(createDocumentDto, user);
  //     return res.status(HttpStatus.OK).json({
  //       statusCode: HttpStatus.OK,
  //       message: 'Tipo Documento creado con éxito',
  //       data: {
  //         document: document,
  //       }
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Error al momento de la creacion de coordinación',
  //       error: error.message,
  //     });
  //   }
  // }

  // @UseGuards( AuthGuard )
  // @Get('/document/:id')
  // async getDocument(@Request() req: Request, @Res() res: Response, @Param('id') id: number) {
  //   try {
  //     const user = req['user'];
  //     const document = await this.adminService.getDocument(id);
  //     return res.status(HttpStatus.OK).json({
  //       statusCode: HttpStatus.OK,
  //       message: 'Petición realizada con éxito',
  //       data: {
  //         document: document,
  //       }
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Error al momento de retornar la busqueda',
  //       error: error.message,
  //     });
  //   } 
  // }

  // ********** Metodos Paises **********
  @UseGuards( AuthGuard )
  @Get('country/get-all-countries')
  public async getAll(@Request() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const countries = await this.adminService.getAllCountries(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          countries: countries,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda paises',
        error: error.message,
      });
    } 
  }

  // ********** Metodos Departamentos **********
  @UseGuards( AuthGuard )
  @Get('state/get-all-states')
  public async getAllStates(@Request() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const states = await this.adminService.getAllStates(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          states: states,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda de departamentos',
        error: error.message,
      });
    } 
  }

  // ********** Metodos Ciudades **********
  @UseGuards( AuthGuard )
  @Get('city/get-all-cities')
  public async getAllCities(@Request() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const cities = await this.adminService.getAllCities(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          cities: cities,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda de ciudades',
        error: error.message,
      });
    } 
  }

  // ********** Metodos Roles **********
  @UseGuards( AuthGuard )
  @Get('/roles/get-all-roles')
  public async getAllUsers(@Res() res: Response) {
    try {
      const roles = await this.adminService.getAllRoles();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: roles,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }

  // ********** Metodos Tipos Programa **********
  @UseGuards( AuthGuard )
  @Post('/type-program')
  public async createTypeProgram(@Request() req: Request, @Res() res: Response, @Body() createTypeProgramDto: CreateTypeProgramDto) {
    try {
      const user = req['user'];
      const typeProgram = await this.adminService.createTypeProgram(createTypeProgramDto, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Tipo Documento creado con éxito',
        data: {
          typeProgram: typeProgram,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de la creacion de coordinación',
        error: error.message,
      });
    }
  }

  // @UseGuards( AuthGuard )
  @Get('/type-program/get-all-type-programs')
  public async getAllTypePrograms(@Req() req: Request,  @Res() res: Response) {
    try {
      const user = req['user'];
      const typePrograms = await this.adminService.getAllTypePrograms(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {typePrograms},
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
  @Get('/type-program/get-all-type-programs-list')
  public async getAllTypeProgramsList(@Req() req: Request,  @Res() res: Response) {
    try {
      const user = req['user'];
      const typePrograms = await this.adminService.getAllTypeProgramsList(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: typePrograms,
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
  @Patch('program-type/:id')
  async UpdateProgramType(@Res() res: Response, @Param('id') id: string, @Body() updateProgramTypeDto: UpdateProgramTypeDto) {
    try {
      const userDetail = await this.adminService.UpdateProgramType(+id, updateProgramTypeDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Registro actualizado éxitosamente',
        user: {
          userDetail: userDetail,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }


  // ********** Metodos Tipos Programa **********
  @UseGuards( AuthGuard )
  @Post('/type-modality')
  public async createTypeModality(@Request() req: Request, @Res() res: Response, @Body() createTypeModalityDto: CreateTypeModalityDto) {
    try {
      const user = req['user'];
      const typeModality = await this.adminService.createTypeModality(createTypeModalityDto, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Tipo de modalidad creada con éxito',
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
  @Get('/type-modality/get-all-type-modalities')
  public async getAllTypeModality(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const typeModalities = await this.adminService.getAllTypeModalities(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {typeModalities},
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
  @Get('/type-modality/get-all-type-modalities-list')
  public async getAllTypeModalitiesList(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const typeModalities = await this.adminService.getAllTypeModalitiesList(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: typeModalities,
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
  @Patch('modality-type/:id')
  async UpdateNodalityType(@Res() res: Response, @Param('id') id: string, @Body() updateModalityTypeDto: UpdateModalityTypeDto) {
    try {
      const modality = await this.adminService.UpdateNodalityType(+id, updateModalityTypeDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Registro actualizado éxitosamente',
        modality: modality,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }

  // Cycles
  // @UseGuards( AuthGuard )
  @Get('/cycles/get-all-cycles')
  public async getAllCycles(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const cycles = await this.adminService.getAllCycles(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: { cycles },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }


  // Content
  // @UseGuards( AuthGuard )
  @Get('/contents/get-all-contents')
  public async getAllContents(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const contents = await this.adminService.getAllContents(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: { contents },
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
