import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNumber, IsString } from "class-validator";

export class UserSignUpDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsAlphanumeric()
    password: string;

    @ApiProperty()
    @IsNumber()
    role: number;
}



export class UserSignInpDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsAlphanumeric()
    password: string;

}