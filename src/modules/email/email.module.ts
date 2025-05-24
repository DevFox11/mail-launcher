import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { envs } from 'src/config/envs';
import { EmailProcessor } from './email.processor';


@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: envs.redisHost,
        port: envs.redisPort,
        password: envs.redisPassword,
      },
    }),
    BullModule.registerQueue({
      name: 'email.queue',
    }),
  ],
  providers: [EmailService, EmailProcessor],
  controllers: [EmailController]
})
export class EmailModule {}
