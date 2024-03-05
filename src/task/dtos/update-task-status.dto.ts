import { ApiProperty } from "@nestjs/swagger"
import { Estados } from "../task.entity"



export class UpdateTaskStatusDto{
    id: number
    @ApiProperty()
    state: Estados
}