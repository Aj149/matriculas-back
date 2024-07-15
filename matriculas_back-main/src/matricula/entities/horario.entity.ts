import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AulaEntity } from './aula.entity';
import { Dia } from '../enums/dia';
import { Modalidad } from '../enums/modalidad';
import { ProgramacionEntity } from './programacion.entity';


@Entity('horario', {schema: 'sistema' })
export class HorarioEntity {
  @PrimaryGeneratedColumn('increment')
  id_horario: number;

  @Column('varchar', { length: 50, nullable: false })
  dia: Dia;

  @Column('time', { nullable: false })
  horaInicio: string;

  @Column('time', { nullable: false })
  horaSalida: string;

  @Column('varchar', { length: 50, nullable: true })
  modalidad: Modalidad; 
  
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precio: number | null;


  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  // 1indica que un horario pertenece a un aula. aula es el nombre de la 
  // 1columna que actúa como clave externa en la tabla horario.
  @ManyToOne(() => AulaEntity, (aula) => aula.horarios)
  @JoinColumn({ name: 'aula'})
  aula: AulaEntity;
  // 1########################


  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: 'true=activo, false=inactivo',
  })
  isActive: boolean;

  // 1indicando que un horario puede estar asociado a varias programaciones.
  @ManyToMany(() => ProgramacionEntity, (programacion) => programacion.horario)
  programacion: ProgramacionEntity[];
}
