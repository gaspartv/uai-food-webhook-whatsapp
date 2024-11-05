import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "testing", "homologation", "production"]),
  PORT: z.coerce.number(),

  META_URL: z.string().url(),
  META_WHATSAPP_VERIFY_TOKEN: z.string(),

  RABBITMQ_URL: z.string().url(),
  RABBITMQ_QUEUE_STATUS: z.string(),
  RABBITMQ_QUEUE_CHAT: z.string(),
  RABBITMQ_NAME_STATUS: z.string(),
  RABBITMQ_NAME_CHAT: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

const env = _env.data;

export { env };
