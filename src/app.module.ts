import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { AdminModule } from './controllers/admin/admin.module';
import { UserModule } from './controllers/user/user.module';
import { RoleModule } from './controllers/role/role.module';
import { TypeDocumentsModule } from './controllers/type-documents/type-documents.module';
import { ProgramModule } from './controllers/program/program.module';
import { GroupModule } from './controllers/gruop/group.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterStudentModule } from './controllers/register-student/register-student.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //Imports of config,
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'rc_fundetec_db',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ 
        join(__dirname, '**', '*.entity.{ts,js}')
      ], 
      synchronize: false,
      logging: false,   
    }), 
    AuthModule,
    AdminModule,
    UserModule, 
    RoleModule,
    TypeDocumentsModule,
    ProgramModule,
    GroupModule,
    RegisterStudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
