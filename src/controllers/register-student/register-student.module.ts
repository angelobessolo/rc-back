import { forwardRef, Module } from '@nestjs/common';
import { RegisterStudentService } from './register-student.service';
import { RegisterStudentController } from './register-student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentForms } from './entities/student-forms.entity';
import { TypeDocumentsModule } from 'src/controllers//type-documents/type-documents.module';
import { AdminModule } from 'src/controllers/admin/admin.module';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { ProgramModule } from 'src/controllers/program/program.module';
import { Group } from 'src/controllers/gruop/entities/group.entity';
import { GroupModule } from 'src/controllers/gruop/group.module';
import { StudentFormsCycles } from './entities/student-forms-cycle.entity';

@Module({
  controllers: [RegisterStudentController],
  providers: [RegisterStudentService],
   imports: [
    TypeOrmModule.forFeature([
      StudentForms,
      StudentFormsCycles
    ]),

    forwardRef(() => TypeDocumentsModule), 
    forwardRef(() => AdminModule), 
    forwardRef(() => AuthModule),
    forwardRef(() => ProgramModule),
    forwardRef(() => GroupModule)
  ],
  exports: [
    // Export entities
    TypeOrmModule,

    // Export Services
    RegisterStudentService
  ]
})
export class RegisterStudentModule {}
