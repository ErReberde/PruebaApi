import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/task/task.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
    ADMIN = "ADMIN",
    USER = "USER"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @ApiProperty()
    @Column({unique: true})
    userName: string

    @ApiProperty()
    @Column({unique: true})
    email: string

    @ApiProperty()
    @Column({default: Roles.USER})
    role: Roles

    @ApiProperty()
    @Column()
    password: string

    @ApiProperty()
    @OneToMany( type=> Task, task=> task)@JoinTable()
    task: Task[]

}