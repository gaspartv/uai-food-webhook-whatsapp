import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { env } from "src/configs/env";
import { MetaWhatsappController } from "./meta-whatsapp.controller";
import { MetaWhatsappService } from "./meta-whatsapp.service";

@Module({
  imports: [
    HttpModule,
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: env.RABBITMQ_NAME,
          useFactory: () => ({
            transport: Transport.RMQ,
            options: {
              urls: [env.RABBITMQ_URL],
              queue: env.RABBITMQ_QUEUE,
              queueOptions: {
                durable: true,
              },
            },
          }),
        },
      ],
    }),
  ],
  controllers: [MetaWhatsappController],
  providers: [MetaWhatsappService],
})
export class MetaWhatsappModule {}
