import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';

import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { Alumno } from './alumno.entity';

@Controller('alumno')
export class AlumnoController {
  constructor(private alumnoService: AlumnoService) {}

  @Post()
  createAlumno(@Body() newAlumno: CreateAlumnoDto) {
    const alumno = new Alumno();
    alumno.nombre = newAlumno.nombre;
    alumno.curso = newAlumno.curso;
    alumno.nota1 = newAlumno.nota1;
    alumno.nota2 = newAlumno.nota2;
    alumno.promedio = (newAlumno.nota1 + newAlumno.nota2) / 2;

    return this.alumnoService.createAlumno(alumno);
  }

  @Get()
  getAlumnos(): Promise<Alumno[]> {
    return this.alumnoService.getAlumnos();
  }

  @Get(':id')
  getAlumno(@Param('id', ParseIntPipe) id: number): Promise<Alumno> {
    return this.alumnoService.getAlumno(id);
  }
}
