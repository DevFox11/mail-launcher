import { Injectable } from '@nestjs/common';

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

    sendEmail = () => {
        return {msg: 'Enviado desde EmailService'};
    }
}
