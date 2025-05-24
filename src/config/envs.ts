import 'dotenv/config'
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number({
    required_error:'PORT is required',
    invalid_type_error:'PORT must be a number'
  }).min(1).max(65535).default(3000) 
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables', env.error.format());
  throw new Error('Invalid environment variables');
}

export const envs = {
    port: env.data.PORT,
    nodeEnv: env.data.NODE_ENV,
}