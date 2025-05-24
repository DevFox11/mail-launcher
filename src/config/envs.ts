import 'dotenv/config'
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number({
    required_error: 'El PORT es requerido',
    invalid_type_error: 'El PORT debe ser un número'
  }).min(1).max(65535).default(3000),
  REDIS_HOST: z.string({
    required_error: 'El REDIS_HOST es requerido',
    invalid_type_error: 'El REDIS_HOST debe ser una cadena'
  }).min(1).max(255),
  REDIS_PORT: z.coerce.number({
    required_error: 'El REDIS_PORT es requerido',
    invalid_type_error: 'El REDIS_PORT debe ser un número'  
  }),
  REDIS_PASSWORD: z.string().optional(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Variables de entorno inválidas', env.error.format());
  throw new Error('Variables de entorno inválidas');
}

export const envs = {
    port: env.data.PORT,
    nodeEnv: env.data.NODE_ENV,
    redisHost: env.data.REDIS_HOST,
    redisPort: env.data.REDIS_PORT,
    redisPassword: env.data.REDIS_PASSWORD,
}