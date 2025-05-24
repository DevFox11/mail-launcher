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

    @Post('send-email-test')
    async sendEmailTest() {
        const email = {
            mailOptions: {
                from: 'mail@mail.com.co',
                to: 'hamiltonpatinosolano@gmail.com',
                subject: 'Este es un correo de prueba',
                html: `
                    <div style="font-family: 'Roboto', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #333333; color: #ffffff;">
                        <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Correo de Prueba ✉️</h1>
                        <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                            ¡Hola! 👋
                        </p>
                        <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                            Este es un correo de prueba para verificar la funcionalidad de envío de correos electrónicos. El correo está estilizado con CSS en línea y utiliza la familia de fuentes Roboto. 🚀
                        </p>
                        <div style="background-color: #444444; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="color: #ffffff; font-size: 14px; margin: 0;">
                                Si recibiste este correo, la prueba fue exitosa. ✅
                            </p>
                        </div>
                        <p style="color: #ffffff; font-size: 16px; line-height: 1.6;">
                            Saludos cordiales,<br>
                            Equipo Mail Launcher 💌
                        </p>
                        <a href="#" style="display: inline-block; background-color: #F5F5DC; color: #333333; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold;">Entrar</a>
                    </div>
                `
            },
            smtpConfig: {
                host: 'sandbox.smtp.mailtrap.io',
                port: 2525,
                secure: false,
                auth: {
                    user: '4f422f8e688692',
                    pass: 'feb8a39b44ea2b'
                }
            }
        }
        return this.emailService.sendEmail(email);
    }
}
