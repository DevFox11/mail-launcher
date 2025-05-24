import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SendEmailDto } from 'src/common/dto';

/**
 * Servicio para el manejo y envío de correos electrónicos
 * 
 * Este servicio proporciona funcionalidades para:
 * - Enviar correos electrónicos
 * - Gestionar plantillas de correo
 * - Procesar adjuntos
 * 
 * @remarks
 * El servicio utiliza una implementación inyectable para mantener
 * la flexibilidad y facilitar las pruebas unitarias
 */

@Injectable()
export class EmailService {
    constructor(
        @InjectQueue('email.queue') private readonly emailQueue: Queue,
    ) {}
    async sendEmail (sendEmailDto: SendEmailDto) {
        const { smtpConfig, mailOptions } = sendEmailDto;

        try {
            await this.emailQueue.add('send-email', {
                mailOptions,
                smtpConfig,
            },{
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
            });
            return {
                message: 'Correo enviado correctamente',
            }
        } catch (error) {
            throw new Error(`Hay un problema con el envío del correo: ${error.message}`)
        }
    }
}
