import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDetail } from './entities/user-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { AdminModule } from 'src/controllers/admin/admin.module';
import { RoleModule } from '../role/role.module';
import { TypeDocumentsModule } from '../type-documents/type-documents.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserDetail
    ]),
    forwardRef(() => AuthModule), 
    forwardRef(() => AdminModule), 
    forwardRef(() => RoleModule), 
    forwardRef(() => TypeDocumentsModule), 
  ],
  exports: [
    UserService,

    // Export entities
    TypeOrmModule
  ],
})
export class UserModule {}
