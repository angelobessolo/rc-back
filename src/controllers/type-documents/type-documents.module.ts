import { forwardRef, Module } from '@nestjs/common';
import { TypeDocumentsService } from './type-documents.service';
import { TypeDocumentsController } from './type-documents.controller';
import { TypeDocuments } from './entities/documents.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { RoleModule } from '../role/role.module';
import { ProgramModule } from '../program/program.module';

@Module({
  controllers: [TypeDocumentsController],
  providers: [TypeDocumentsService],
  imports: [
    TypeOrmModule.forFeature([
      TypeDocuments
    ]),
    forwardRef(() => AuthModule), 
    forwardRef(() => AdminModule), 
    forwardRef(() => RoleModule), 
    forwardRef(() => ProgramModule), 
  ],
  exports: [
    // Export services
    TypeDocumentsService,

    // Export entities
    TypeOrmModule
  ],
})
export class TypeDocumentsModule {}
