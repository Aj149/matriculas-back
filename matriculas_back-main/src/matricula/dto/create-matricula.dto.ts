import {
  IsNotEmpty,
  IsInt,
  ValidateNested,
  IsString,

  
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsValidDate } from 'src/decorators/is-valid-date';
class ProgramacionDto {
 
  @IsNotEmpty({ message: 'El horario_id no puede estar vacío.' })
  horario_id: number[]; 
 
}

export class CreateMatriculaDto {
  @IsNotEmpty({ message: 'La fecha no puede estar vacía.' })
  @IsValidDate()
  fecha: Date;

  @IsNotEmpty({ message: 'La fechaInicio no puede estar vacía.' })
  @IsValidDate()
  fechaInicio: Date;

  @IsNotEmpty({ message: 'La fechaFinal no puede estar vacía.' })
  @IsValidDate()
  fechaFinal: Date;

  @IsString()
  horario: string;

  @IsInt({ message: 'El id_estudiante debe ser un número entero.' })
  id_estudiante: number;

  @IsInt({ message: 'El id_usuario debe ser un número entero.' })
  id_usuario: number;

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsInt({each:true})
  // materias: number[];

  @IsInt({ message: 'El id_materia debe ser un número entero.' })
  id_materia: number;

  @ValidateNested()
  @Type(() => ProgramacionDto)
  programacion: ProgramacionDto;

  @IsInt( {message: 'El id_turno debe ser un número entero.'})
  id_turno: number;
}
