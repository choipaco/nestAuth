import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class MailChkDTO {

    @IsEmail()
    email: string;

    @MinLength(6)
    @MaxLength(6)
    @IsString()
    code: string;
}
