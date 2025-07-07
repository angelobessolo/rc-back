import { Test, TestingModule } from '@nestjs/testing';
import { RegisterStudentService } from './register-student.service';

describe('RegisterStudentService', () => {
  let service: RegisterStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterStudentService],
    }).compile();

    service = module.get<RegisterStudentService>(RegisterStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
