import { Test, TestingModule } from '@nestjs/testing';
import { TypeDocumentsService } from './type-documents.service';

describe('TypeDocumentsService', () => {
  let service: TypeDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeDocumentsService],
    }).compile();

    service = module.get<TypeDocumentsService>(TypeDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
