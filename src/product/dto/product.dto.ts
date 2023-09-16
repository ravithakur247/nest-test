import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AddProdcut {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description: string | null;
}
export class UpdateProduct {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description: string | null;
}