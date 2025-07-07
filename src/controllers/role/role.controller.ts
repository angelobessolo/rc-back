import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import {Response} from 'express';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/controllers/auth/guards/Auth.guard';
import { CreateRoleModuleDto } from './dto/create-role-module.dto';
import { UpdateRoleModuleDto } from './dto/update-role-module.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}
  
  // ********** Metodos Roles **********
  @UseGuards( AuthGuard )
  @Post()
  create(@Request() req: Request, @Body() createRoleDto: CreateRoleDto) {
    const user = req['user'];
    return this.roleService.create(createRoleDto, user);
  }

  @UseGuards( AuthGuard )
  @Get('byName/:roleName')
  findRoleByName(@Param('roleName') roleName: string) {
    return this.roleService.findRoleByName(roleName);
  }

  @UseGuards( AuthGuard )
  @Get('/get-all-roles')
  async getAll(@Request() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const roles = await this.roleService.getAllRoles(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          roles: roles,
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

  @UseGuards( AuthGuard )
  @Get('/:id')
  async getRolById(@Request() req: Request, @Res() res: Response, @Param('id') id: number) {
    try {
      const user = req['user'];
      const rol = await this.roleService.getRolById(+id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          rol: rol,
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
}
