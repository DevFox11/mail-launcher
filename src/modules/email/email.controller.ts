import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

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
    ) {}

    @Post('send')
    async sendEmail() {
        return this.emailService.sendEmail();
    }
}
