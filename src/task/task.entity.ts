import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum Estados {
    CERRADO = "CERRADO",
    ABIERTO = "ABIERTO",
    TERMINADO = "TERMINADO",
    PENDIENTE = "PENDIENTE"
}


@Entity()
export class Task {
    
    @PrimaryGeneratedColumn("increment")
    id: number
    
    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column({type: "varchar", nullable:true})
    descriptionTask: string
    
    @ApiProperty()
    @ManyToOne(type => User, user=> user.task)@JoinTable()
    user: User

    @ApiProperty()
    @Column({default: Estados.PENDIENTE, enum: Estados})
    state: Estados
}


