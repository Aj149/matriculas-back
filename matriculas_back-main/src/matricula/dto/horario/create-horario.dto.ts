import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Dia } from 'src/matricula/enums/dia';
import { Modalidad } from 'src/matricula/enums/modalidad';


export class CreateHorarioDto {
    
    @IsEnum(Dia, { message: 'solo dias de la semana en minusculas' })
    dia: Dia;   
    
    @IsString()
    horaInicio: string;
    
    @IsString()
    horaSalida: string;
    
    @IsEnum(Modalidad, { message: 'la modalidad sólo puede ser presencial o virtual' })
    modalidad?: Modalidad;
    
    @IsNumber({}, { message: 'El precio debe ser un número' })
    precio: number | null;

    @IsNumber()
    @IsOptional()
    aulaId?: number;
}
