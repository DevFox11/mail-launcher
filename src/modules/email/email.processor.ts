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

        let sanitizedHtml = sanitizeHtml(mailOptions.html,{
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'br', 'hr', 'div', 'span', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'strong', 'em', 'b', 'i', 'u', 'a']),
            allowedAttributes: {
                '*': ['style', 'class', 'id'],
                'a': ['href', 'target', 'rel'],
                'img': ['src', 'alt', 'width', 'height'],
                'table': ['width', 'border', 'cellpadding', 'cellspacing'],
                'td': ['width', 'colspan', 'rowspan', 'align', 'valign'],
                'th': ['width', 'colspan', 'rowspan', 'align', 'valign'],
                'tr': ['align', 'valign'],
                'p': ['align'],
                'div': ['align'],
                'span': ['style'],
                'ul': ['type'],
                'ol': ['type', 'start'],
                'li': ['value']
            },
            allowedStyles: {
                '*': {
                    'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                    'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
                    'font-size': [/^\d+(?:px|em|%)$/],
                    'font-family': [/.*/],
                    'font-weight': [/^\d+$/, /^normal$/, /^bold$/],
                    'font-style': [/^normal$/, /^italic$/],
                    'text-decoration': [/^none$/, /^underline$/],
                    'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                    'margin': [/^\d+(?:px|em|%)$/],
                    'padding': [/^\d+(?:px|em|%)$/],
                    'border': [/^\d+px\s+\w+\s+#[0-9a-f]+$/i],
                    'border-radius': [/^\d+(?:px|em|%)$/],
                    'width': [/^\d+(?:px|em|%)$/],
                    'height': [/^\d+(?:px|em|%)$/],
                    'display': [/^block$/, /^inline$/, /^inline-block$/],
                    'vertical-align': [/^top$/, /^middle$/, /^bottom$/]
                }
            },
            allowedClasses: {
                '*': [/.*/] // Permitir todos los atributos de clase
            },
            allowedIframeHostnames: [], // Permitir todos los hostnames de iframe
            disallowedTagsMode: 'discard', // Descartar etiquetas no permitidas
        })

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