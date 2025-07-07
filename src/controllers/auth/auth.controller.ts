import { Controller, Get, Post, Body, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
// import { AuthGuard } from './guards/Auth.guard';
// import { LoginResponse } from './interfaces/login-response';
// import { User } from './entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/Auth.guard';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interfaces/login-response';
import { Response } from 'express';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // Metodo para crear usuario
  @UseGuards( AuthGuard )
  @Post()
  @ApiResponse({status: 201, description: 'Usuario fue creado éxitosamente', type: User})
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.authService.createUser(createUserDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Usuario fue creado éxitosamente',
        data
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de crear usuario',
        error: error.message,
      });
    }
  }

  @Post('/sign-in')
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
