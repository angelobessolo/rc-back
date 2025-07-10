import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminModule } from 'src/controllers/admin/admin.module';
import { UserModule } from 'src/controllers/user/user.module';
import { RoleModule } from 'src/controllers/role/role.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }), 
 
    // Circular dependencies injection
    forwardRef(() => AdminModule), 
    forwardRef(() => RoleModule), 
    forwardRef(() => UserModule), 
  ],
  exports: [
    // Export services
    AuthService,

    // Export entities
    TypeOrmModule,
  ], 
})
export class AuthModule {}
