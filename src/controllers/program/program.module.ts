import { forwardRef, Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { Program } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { AdminModule } from '../admin/admin.module';

@Module({ 
  controllers: [ProgramController],
  providers: [ProgramService],
  imports: [
    TypeOrmModule.forFeature([
      Program
    ]),
    forwardRef(() => AuthModule), 
    forwardRef(() => AdminModule), 
    // forwardRef(() => StudentModule),
  ],
  exports: [
    ProgramService,

    // Export entities
    TypeOrmModule
  ],
})
export class ProgramModule {}
