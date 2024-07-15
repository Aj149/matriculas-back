// create-turno-rotativo.dto.ts
import { IsString } from 'class-validator';

export class CreateTurnoRotativoDto {

  

  @IsString()
  nombreTurno: string;
}
