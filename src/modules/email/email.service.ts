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
                priority: 1, // Alta prioridad para notificaciones
                attempts: 5,
                backoff: {
                    type: 'exponential',
                    delay: 2000, // Menor delay inicial
                },
                removeOnComplete: true, // Limpiar trabajos completados
                timeout: 30000 // Timeout de 30 segundos
            });
            return {
                message: 'Notificación enviada correctamente',
            }
        } catch (error) {
            throw new Error(`Error en el envío de la notificación: ${error.message}`)
        }
    }
}
