import { Controller, Get, Post, Body, Patch, Param, Request, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/controllers/auth/guards/Auth.guard';
import { UpdateStatusDto } from '../admin/dto/update-status.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards( AuthGuard )
  @Get('/get-all-users')
  async getAllUsers(@Request() req: Request, @Res() res: Response) {
    try {
      const user = req['user'];
      const userData = await this.userService.getAllUsers(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: userData,
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
  @Get('/view-user/:id')
  async viewUser(@Res() res: Response, @Param('id') id: number) {
    try {
      const user = await this.userService.viewUser(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          user: user
        },
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
  async getUserDetail(@Res() res: Response, @Param('id') id: number) {
    try {
      const userDetail = await this.userService.getUserDetail(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: {
          userDetail: userDetail
        },
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
  @Patch('/:id')
  async UpdateUserDetail(@Res() res: Response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const userDetail = await this.userService.updateUserDetail(+id, updateUserDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        user: userDetail,
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
  @Patch('/status/:id')
  async updateUserStatus(@Request() req: Request, @Res() res: Response, @Param('id') id: number, @Body() updateStatusDto: any) {
    try {
      const user = req['user'];
      const userModel = await this.userService.updateUserStatus(+id, updateStatusDto);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Se realizó la actualización de estado del usuario ${userModel.fullName} con éxito`,
        data: {
          user: userModel,
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
