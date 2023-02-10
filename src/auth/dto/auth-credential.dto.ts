import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthCredentialDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'username', example: 'kyc' })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'password', example: '' })
    password: string;
}