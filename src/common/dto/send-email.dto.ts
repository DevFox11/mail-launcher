import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Matches, MaxLength, ValidateNested } from "class-validator";

export class MailOptions {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: 'Formato de correo inválido'
    })
    from: string;

    @IsEmail()
    @IsNotEmpty()
    to: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    subject: string
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(50000) // Límite razonable para notificaciones
    html: string
    
    @IsString()
    @IsOptional()
    text?: string
}

export class SmtpAuth {
    @IsString()
    @IsNotEmpty()
    user: string

    @IsString()
    @IsNotEmpty()
    pass: string
}

export class SmtpConfig {
    @IsString()
    @IsNotEmpty()
    host: string

    @IsNotEmpty()
    @IsNumber()
    port: number

    @IsOptional()
    @IsBoolean()
    secure: boolean
    
    @IsObject()
    @IsNotEmpty()
    auth?: SmtpAuth
}

export class SendEmailDto {
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => MailOptions)
    mailOptions: MailOptions

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SmtpConfig)
    smtpConfig: SmtpConfig
    
}