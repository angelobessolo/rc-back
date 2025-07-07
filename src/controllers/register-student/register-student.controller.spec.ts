import { Test, TestingModule } from '@nestjs/testing';
import { RegisterStudentController } from './register-student.controller';
import { RegisterStudentService } from './register-student.service';

describe('RegisterStudentController', () => {
  let controller: RegisterStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterStudentController],
      providers: [RegisterStudentService],
    }).compile();

    controller = module.get<RegisterStudentController>(RegisterStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
