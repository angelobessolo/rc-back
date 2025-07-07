import { Controller, Get, Post, Body, Patch, Param, Request, Res, HttpStatus, UseGuards, Delete } from '@nestjs/common';
import { RegisterStudentService } from './register-student.service';
import { CreateRegisterStudentDto } from './dto/create-register-student.dto';
import { UpdateRegisterStudentDto } from './dto/update-register-student.dto';
import { Response } from 'express'
import { ApiResponse } from '@nestjs/swagger';
import { StudentForms } from './entities/student-forms.entity';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('register-student')
export class RegisterStudentController {
  constructor(private readonly registerStudentService: RegisterStudentService) {}

  @Post()
  @ApiResponse({status: 201, description: 'Registro realizado éxitosamente', type: StudentForms})
  async createRegisterStudent(@Res() res: Response, @Body() createRegisterStudentDto: CreateRegisterStudentDto) {
    try {
      const register = await this.registerStudentService.createRegisterStudent(createRegisterStudentDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Registro creado éxitosamente',
        data: {
          register: register,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento realizar el registro en el sistema',
        error: error.message,
      });  
    }
  }

  @Get('/register-bill/:id')
  @ApiResponse({status: 201, description: 'Registro realizado éxitosamente', type: StudentForms})
  async getRegisterStudentBill(@Res() res: Response, @Param('id') id: number) {
    try {
      const { studentForms, doc } = await this.registerStudentService.GetRegisterStudentBill(+id);
      const { buffer, path, filename } = doc;

      // Convierte el buffer a base64 para enviarlo como string en JSON
      const documentBase64 = buffer.toString('base64');

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Registro de estudiante ${studentForms.names} ${studentForms.sureNames} generado con éxito`,
        data: {
          document: documentBase64,
          path: path,
          filename: filename,
        }
      });
      // const doc = await this.registerStudentService.GetRegisterStudentBill(+id);

      // res.setHeader('Content-Type', 'application/pdf');
      // res.setHeader('Content-Disposition', 'inline; filename=registro_estudiante.pdf');

      // doc.info.Title = 'Registro del Estudiante';
      // doc.pipe(res);
      // doc.end();

      // const { buffer, path, filename } = await this.registerStudentService.GetRegisterStudentBill(+id);

      // res.set({
      //   'Content-Type': 'application/pdf',
      //   'Content-Disposition': `inline; filename="${filename}"`,
      //   'Content-Length': buffer.length,
      // });

      // Envía el buffer como respuesta
      // res.end(buffer); // importante usar end(buffer) aquí
      // return res.status(HttpStatus.OK).json({
      //   statusCode: HttpStatus.OK,
      //   message: 'Registro realizado con éxito',
      //   data: {
      //     register: register,
      //   }
      // });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento realizar el registro en el sistema',
        error: error.message,
      });  
    }
  }

  @Get('/get-register-student/:id')
  @ApiResponse({status: 201, description: 'Registro realizado éxitosamente', type: StudentForms})
  async getRegisterStudent(@Res() res: Response, @Param('id') id: number) {
    try {
      const studentForms = await this.registerStudentService.getRegisterStudent(+id);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Consulta realizada con éxito`,
        data: { studentForms },
          
      });

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento realizar el registro en el sistema',
        error: error.message,
      });  
    }
  }

  @Patch('/:id')
  async updateStudentForms(@Res() res: Response, @Param('id') id: string, @Body() updateRegisterStudentDto: UpdateRegisterStudentDto) {
    try {
      const userDetail = await this.registerStudentService.updateStudentForms(+id, updateRegisterStudentDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada éxitosamente',
        user: {
          userDetail: userDetail,
        }
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    }
  }

  @UseGuards( AuthGuard )
  @Get('get-all-registered-students')
  async getAllRegisteredStudents(@Request() req: Request, @Res() res: Response) {
    try { 
      const user = req['user'];
      const studentsPrograms = await this.registerStudentService.getAllRegisteredStudents(user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con éxito',
        data: studentsPrograms,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda de registros',
        error: error.message,
      });
    }
  }

  @UseGuards( AuthGuard )
  @Delete('delete-register-student/:id')
  async deleteRegisterStudent(@Request() req: Request, @Res() res: Response, @Param('id') id: number) {
    try { 
      const user = req['user'];
      const deletedRegisterStudent = await this.registerStudentService.deleteRegisterStudent(+id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Registro de estudiante ${deletedRegisterStudent.names} ${deletedRegisterStudent.sureNames} eliminado correctamente`,
        data: deletedRegisterStudent,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de eliminar registro',
        error: error.message,
      });
    }
  }
}
