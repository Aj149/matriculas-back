import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MatriculaEntity } from "./matricula.entity";

@Entity('turnoRotativo', {schema: 'sistema'})
export class TurnoRotativoEntity{
    @PrimaryGeneratedColumn('increment')
    id_turno: number;

    @Column('varchar', { length: 50, nullable: false })
    nombreTurno:string;

    @Column({
        name: 'is_active',
        type: 'boolean',
        default: true,
        comment: 'true=activo, false=inactivo',
      })
      isActive: boolean;
    
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

      @OneToMany(() => MatriculaEntity, (matricula) => matricula.turno)
      matriculas: MatriculaEntity[];
}    