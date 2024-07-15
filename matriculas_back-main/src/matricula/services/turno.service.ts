import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TurnoRotativoEntity } from '../entities/turnoRotativo.entity';
import { Repository } from "typeorm";
import { CreateTurnoRotativoDto } from '../dto/turnoRotativo/turno.dto';
import { MessageDto } from "src/common/message.dto";


@Injectable()
export class TurnoService{
    constructor(
        @InjectRepository(TurnoRotativoEntity)
        private readonly turnoRotativoEntity: Repository<TurnoRotativoEntity>
    ) {}

    async createTurno(createTurnoRotativoDto: CreateTurnoRotativoDto) {
        const turno = await this.turnoRotativoEntity.create(createTurnoRotativoDto);
        await this.turnoRotativoEntity.save(turno);
        return new MessageDto(`turno ${turno.nombreTurno} creado`);
    }

    async buscarTurnos() {
        const list = await this.turnoRotativoEntity.find();
        console.log("no sirve", list)
        if(!list.length) {
            throw new NotFoundException(new MessageDto('no hay turnos'));
        }
        list.sort((a, b) => b.id_turno - a.id_turno);
        return list;
    }

    async buscarUnTurno(id_turno: number) {
        const turno = await this.turnoRotativoEntity.findOne({
            where: { id_turno: id_turno },
        });
        if (!turno) {
            throw new NotFoundException(new MessageDto('no existe el turno'));
        }
        return turno;
    }

    async actualizarTurno(id_turno: number, updateTurnoRotativoDto: CreateTurnoRotativoDto) {
        const turno = await this.buscarUnTurno(id_turno);
        if(!turno) {
            throw new NotFoundException(new MessageDto('no existe el turno'));
        }
        Object.assign(turno, updateTurnoRotativoDto);
        await this.turnoRotativoEntity.save(turno);
        return new MessageDto(`Turno ${turno.nombreTurno} actualizado`)
    }

    async eliminarTurno(id_turno: number) {
        const turno = await this.buscarUnTurno(id_turno);
        await this.turnoRotativoEntity.softRemove(turno);
        return new MessageDto(`Turno ${turno.nombreTurno} eliminado`)
    }
}