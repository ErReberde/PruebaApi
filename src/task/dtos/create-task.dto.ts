import { ApiProperty } from "@nestjs/swagger"


export class CreatTaskDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    userId: number
}