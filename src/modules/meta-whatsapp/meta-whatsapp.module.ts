import { Module } from "@nestjs/common";
import { MetaWhatsappController } from "./meta-whatsapp.controller";
import { MetaWhatsappService } from "./meta-whatsapp.service";

@Module({
  imports: [],
  controllers: [MetaWhatsappController],
  providers: [MetaWhatsappService],
  exports: [],
})
export class MetaWhatsappModule {}
