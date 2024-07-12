import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { Alumno } from './alumno.entity';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
  ) {}

  async createAlumno(alumno: CreateAlumnoDto) {
    if (!alumno.nombre || !alumno.curso || !alumno.nota1 || !alumno.nota2) {
      throw new HttpException(
        'Los campos nombre, curso, nota1 y nota2 son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryRunner =
      this.alumnoRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const alumnoFound = await this.alumnoRepository.findOne({
        where: {
          nombre: alumno.nombre,
        },
      });

      if (alumnoFound) {
        throw new HttpException('Alumno already exists', HttpStatus.CONFLICT);
      }

      const newAlumno = this.alumnoRepository.create(alumno);
      await queryRunner.manager.save(newAlumno);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Error en la creación del alumno.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  getAlumnos() {
    return this.alumnoRepository.find();
  }

  getAlumno(id: number) {
    return this.alumnoRepository.findOne({
      where: { id },
    });
  }
}
