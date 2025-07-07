import { Test, TestingModule } from '@nestjs/testing';
import { TypeDocumentsController } from './type-documents.controller';
import { TypeDocumentsService } from './type-documents.service';

describe('TypeDocumentsController', () => {
  let controller: TypeDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeDocumentsController],
      providers: [TypeDocumentsService],
    }).compile();

    controller = module.get<TypeDocumentsController>(TypeDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
