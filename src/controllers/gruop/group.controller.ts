import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, Request } from '@nestjs/common';
import { CreateGruopDto } from './dto/create-group.dto';
import { UpdateGruopDto } from './dto/update-group.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/controllers/auth/guards/Auth.guard';
import { Group } from './entities/group.entity';
import { Response } from 'express';
import { GroupService } from './group.service';
import { AddSubjectDto } from './dto/add-subjetc.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // Methods about students programs
  @UseGuards( AuthGuard )
  @Post()
  @ApiResponse({status: 201, description: 'Grupo creado éxitosamente', type: Group})
  async create(@Res() res: Response, @Body() createGruopDto: CreateGruopDto) {
    try {
      const group = await this.groupService.createGroup(createGruopDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Grupo creado éxitosamente',
        data: {
          group: group,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de crear grupo',
        error: error.message,
      });
    }
  }

  // @UseGuards( AuthGuard )
  @Get('/get-all-groups')
  async getAllGroups(@Res() res: Response) {
    try {
      const groups = await this.groupService.getAllGroups();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada éxitosamente',
        data: {groups},
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
  @Get('/get-all-groups-list')
  async getAllGroupsList(@Res() res: Response) {
    try {
      const groups = await this.groupService.getAllGroupsList();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada éxitosamente',
        data: groups,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }

  // @UseGuards( AuthGuard )
  // @Get('/get-group-detail/:id')
  // async getDetailGroup(@Request() req: Request, @Res() res: Response, @Param('id') id: number) {
  //   try {
  //     const user = req['user']
  //     const groupDetail = await this.groupService.getDetailGroup(user);
  //     return res.status(HttpStatus.OK).json({
  //       statusCode: HttpStatus.OK,
  //       message: 'Petición realizada con éxito',
  //       data: groupDetail,
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Error al momento de retornar la busqueda',
  //       error: error.message,
  //     });
  //   }
  // }

  // @UseGuards( AuthGuard )
  // @Post('/add-subjects')
  // async addSubjects(@Request() req: Request, @Res() res: Response, @Body() addSubjectDto: AddSubjectDto) {
  //   try {
  //     const user = req['user']
  //     const subjectsGroup = await this.groupService.addSubjects(user, addSubjectDto);
  //     return res.status(HttpStatus.OK).json({
  //       statusCode: HttpStatus.OK,
  //       message: 'Petición realizada con éxito',
  //       data: subjectsGroup,
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Error al momento de retornar la busqueda',
  //       error: error.message,
  //     });
  //   }
  // }
}
