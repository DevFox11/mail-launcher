import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as sanitizeHtml from "sanitize-html";

import { SendEmailDto } from "src/common/dto";
import { createTransporter } from "src/config/nodemailer";

/**
 * Email processor class that handles email sending operations through a queue
 * 
 * This processor uses Bull queue to handle email sending tasks asynchronously.
 * It processes jobs from the 'email.queue' queue and specifically handles
 * the 'send-email' job type.
 * 
 * The processor:
 * 1. Receives email data and SMTP configuration
 * 2. Sanitizes HTML content for security
 * 3. Creates a nodemailer transporter
 * 4. Sends the email using the configured transporter
 * 
 * @throws {Error} If email sending fails
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
            throw new Error(`Error sending email: ${error.message}`);
        }
    }
}