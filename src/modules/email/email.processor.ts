import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as sanitizeHtml from "sanitize-html";

import { SendEmailDto } from "src/common/dto";
import { createTransporter } from "src/config/nodemailer";

/**
 * Clase procesadora de correos que maneja operaciones de envío a través de una cola de procesamiento
 * 
 * Este procesador implementa Bull Queue para gestionar el envío asíncrono de correos electrónicos.
 * Se encarga de procesar las tareas en la cola 'email.queue', específicamente aquellas
 * con el identificador 'send-email'.
 * 
 * Flujo de procesamiento:
 * 1. Recibe los datos del correo (destinatario, asunto, contenido) y la configuración SMTP
 * 2. Aplica sanitización al contenido HTML para prevenir inyecciones maliciosas
 * 3. Inicializa un transportador SMTP mediante nodemailer con la configuración proporcionada
 * 4. Ejecuta el envío del correo electrónico a través del transportador
 * 
 * Consideraciones de seguridad:
 * - Sanitiza automáticamente el contenido HTML para prevenir XSS
 * - Utiliza configuración SMTP segura para el envío
 * 
 * @throws {Error} Si ocurre un error durante el proceso de envío del correo electrónico
 */

@Processor('email.queue')
export class EmailProcessor {
    @Process('send-email')
    async handleSendEmail(job: Job<SendEmailDto>) {
        const { mailOptions, smtpConfig } = job.data;

        let sanitizedHtml = sanitizeHtml(mailOptions.html,)

        const transporter = createTransporter(smtpConfig);

        try {
            await transporter.sendMail({
                ...mailOptions,
                html: sanitizedHtml
            });
        } catch (error) {
            throw new Error(`Error al enviar el correo electrónico: ${error.message}`);
        }
    }
}