import 'dotenv/config'
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number({
    required_error: 'El PORT es requerido',
    invalid_type_error: 'El PORT debe ser un número'
  }).min(1).max(65535).default(3000) 
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Variables de entorno inválidas', env.error.format());
  throw new Error('Variables de entorno inválidas');
}

export const envs = {
    port: env.data.PORT,
    nodeEnv: env.data.NODE_ENV,
}