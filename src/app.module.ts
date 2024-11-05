import { Module } from "@nestjs/common";
import { MetaWhatsappModule } from "./providers/meta-whatsapp/meta-whatsapp.module";

@Module({
  imports: [MetaWhatsappModule],
})
export class AppModule {}
