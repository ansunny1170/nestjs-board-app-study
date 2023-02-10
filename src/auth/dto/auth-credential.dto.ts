import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ description: 'username', example: 'kyc' })
    username: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    @ApiProperty({ description: 'password', example: '' })
    password: string;
}