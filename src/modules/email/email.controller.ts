import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from 'src/common/dto';

/**
 * Controlador para el manejo de correos electrónicos
 * 
 * Este controlador expone endpoints para enviar correos electrónicos
 * a través del servicio EmailService.
 * 
 * @class EmailController
 */

@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
    ) { }

    @Post('send')
    async sendEmail(@Body() sendEmailDto: SendEmailDto) {
        return this.emailService.sendEmail(sendEmailDto);
    }
}
