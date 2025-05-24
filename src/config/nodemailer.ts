import * as nodemailer from 'nodemailer';
import { SmtpConfig } from 'src/common/dto';

/**
 * Creates a nodemailer transport instance for sending emails
 * 
 * @param smtpConfig - SMTP configuration object containing connection details
 * @param smtpConfig.host - SMTP server hostname
 * @param smtpConfig.port - SMTP server port number
 * @param smtpConfig.secure - Whether to use SSL/TLS (defaults to false)
 * @param smtpConfig.auth - Optional authentication credentials
 * @param smtpConfig.auth.user - SMTP username/email
 * @param smtpConfig.auth.pass - SMTP password
 * 
 * @returns Configured nodemailer transport instance
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