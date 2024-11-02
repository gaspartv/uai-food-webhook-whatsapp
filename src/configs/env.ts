import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "testing", "homologation", "production"]),
  PORT: z.coerce.number(),
  WHATSAPP_VERIFY_TOKEN: z.string(),
  RABBITMQ_URL: z.string().url(),
  RABBITMQ_SEND: z.string(),
  RABBITMQ_RECEIVE: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

const env = _env.data;

export { env };
