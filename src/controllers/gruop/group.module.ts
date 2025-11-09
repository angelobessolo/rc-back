import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { ProgramModule } from '../program/program.module';
import { Group } from './entities/group.entity';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [
    TypeOrmModule.forFeature([
      Group,
    ]),
    forwardRef(() => AuthModule), 
    forwardRef(() => ProgramModule), 
  ],
  exports: [
    GroupService,

    // Export entities
    TypeOrmModule
  ],
})
export class GroupModule {}
