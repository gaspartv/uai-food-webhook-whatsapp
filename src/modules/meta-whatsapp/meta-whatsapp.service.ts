import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { env } from "../../configs/env";
import { MetaWhatsappDto } from "./dtos/meta-whatsapp.received.dto";

@Injectable()
export class MetaWhatsappService {
  constructor() {}

  handlerValidation(mode: string, verifyToken: string, challenge: any) {
    const subscribeMode = mode === "subscribe";
    const tokenMatch = verifyToken === env.WHATSAPP_VERIFY_TOKEN;

    if (subscribeMode && tokenMatch) return challenge;

    Logger.error("Validação do WhatsApp falhou", "MetaWhatsappController");
    throw new BadRequestException();
  }

  handlerWhatsapp(dto: MetaWhatsappDto) {
    return Promise.resolve();
  }
}
