import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/countries.entity';
import { City } from './entities/cities.entity';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { Role } from '../role/entities/role.entity';
import { UserModule } from '../user/user.module';
import { TypeDocumentsModule } from '../type-documents/type-documents.module';
import { State } from './entities/states.entity';
import { TypeProgram } from './entities/type-programs.entity';
import { TypeModality } from './entities/type-modalities.entity';
import { Cycle } from './entities/cycles.entity';
import { Content } from './entities/contents.entity';


@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    TypeOrmModule.forFeature([
      Country,
      State,
      City,
      Role,
      TypeProgram,
      TypeModality,
      Cycle,
      Content
    ]),
    forwardRef(() => AuthModule), 
    forwardRef(() => UserModule),
    forwardRef(() => TypeDocumentsModule), 
  ],
  exports: [
    // Export services
    AdminService,

    // Export entities
    TypeOrmModule
  ],

})
export class AdminModule {}
