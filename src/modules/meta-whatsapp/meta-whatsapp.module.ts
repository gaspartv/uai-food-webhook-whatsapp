import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { env } from "src/configs/env";
import { AxiosModule } from "src/providers/axios/axios.module";
import { MetaWhatsappController } from "./meta-whatsapp.controller";
import { MetaWhatsappService } from "./meta-whatsapp.service";

@Module({
  imports: [
    AxiosModule,
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: env.RABBITMQ_NAME_STATUS,
          useFactory: () => ({
            transport: Transport.RMQ,
            options: {
              urls: [env.RABBITMQ_URL],
              queue: env.RABBITMQ_QUEUE_STATUS,
              queueOptions: {
                durable: true,
              },
            },
          }),
        },
        {
          name: env.RABBITMQ_NAME_CHAT,
          useFactory: () => ({
            transport: Transport.RMQ,
            options: {
              urls: [env.RABBITMQ_URL],
              queue: env.RABBITMQ_QUEUE_CHAT,
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
