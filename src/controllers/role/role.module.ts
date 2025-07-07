import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Role } from './entities/role.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([
      Role,
    ]),
    
    // Circular dependencies injection
    forwardRef(() => AuthModule), 
    forwardRef(() => UserModule),
    forwardRef(() => AdminModule), 
  ],
  exports: [
    // Export services
    RoleService,

    // Export entities
    TypeOrmModule
  ]
})
export class RoleModule {}
