import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTypeDocumentDto } from './dto/create-type-document.dto';
import { UpdateTypeDocumentDto } from './dto/update-type-document.dto';
import { codeErrors } from 'src/params';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeDocuments } from './entities/documents.entity';
import { Repository } from 'typeorm';
import { User } from 'src/controllers/auth/entities/user.entity';

@Injectable()
export class TypeDocumentsService {
  public codeErrors = codeErrors;
  constructor(
    @InjectRepository(TypeDocuments)
    private documentsModel: Repository<TypeDocuments>,

    // @InjectRepository(RoleModule)
    // private roleModuleModel: Repository<RoleModule>,
  ) {}

  public async getAll(user: User): Promise<TypeDocuments[]>{
    try {
      const roles = await this.documentsModel.find();

      if (!roles){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return roles;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si es NotFoundException, vuelve a lanzarla
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }
}
