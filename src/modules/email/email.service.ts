import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

    sendEmail = () => {
        return {msg: 'Enviado desde EmailService'};
    }
}
