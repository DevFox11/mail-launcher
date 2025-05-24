import * as nodemailer from 'nodemailer';
import { SmtpConfig } from 'src/common/dto';

/**
 * Crea una instancia de transporte nodemailer para enviar correos electrónicos
 * 
 * @param smtpConfig - Objeto de configuración SMTP que contiene detalles de conexión
 * @param smtpConfig.host - Nombre del servidor SMTP
 * @param smtpConfig.port - Número de puerto del servidor SMTP
 * @param smtpConfig.secure - Si se debe usar SSL/TLS (por defecto es false)
 * @param smtpConfig.auth - Credenciales de autenticación opcionales
 * @param smtpConfig.auth.user - Usuario/email SMTP
 * @param smtpConfig.auth.pass - Contraseña SMTP
 * 
 * @returns Instancia de transporte nodemailer configurada
 */

export const createTransporter = (smtpConfig: SmtpConfig) => {
    return nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure || false,
        auth: smtpConfig.auth ? {
            user: smtpConfig.auth.user,
            pass: smtpConfig.auth.pass
        }: undefined
    });
}