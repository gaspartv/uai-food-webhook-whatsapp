import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { createId } from "@paralleldrive/cuid2";
import { AxiosService } from "src/providers/axios/axios.service";
import { Converter } from "src/utils/converter.util";
import { env } from "../../configs/env";
import { PrismaService } from "../prisma/prisma.service";
import { RedisService } from "../redis/redis.service";
import { MetaWhatsappDto } from "./dtos/meta-whatsapp.received.dto";

@Injectable()
export class MetaWhatsappService {
  constructor(
    @Inject(env.RABBITMQ_NAME_CHAT)
    private readonly rabbitMQToChat: ClientProxy,
    @Inject(env.RABBITMQ_NAME_STATUS)
    private readonly rabbitMQToStatus: ClientProxy,
    private readonly axiosService: AxiosService,
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  handlerValidation(mode: string, verifyToken: string, challenge: any) {
    const subscribeMode = mode === "subscribe";
    const tokenMatch = verifyToken === env.META_WHATSAPP_VERIFY_TOKEN;

    if (subscribeMode && tokenMatch) return challenge;

    Logger.error("Validação do WhatsApp falhou", "MetaWhatsappController");
    throw new BadRequestException();
  }

  async handlerWhatsapp(dto: MetaWhatsappDto) {
    const converteDto = Converter.waToBodyDefault(dto);

    const businessCache = await this.redis.get(
      `business:${converteDto.business.id}`,
    );
    const businessAlreadyExists = await this.prisma.metaWhatsapp.findFirst({
      where: {},
    });
    // USAR REDIS PARA ARMAZENAR AS EMPRESAS PARA NÃO PRECISAR BUSCAR NO BANCO DE DADOS TODA HORA.
    if (!businessAlreadyExists) return;

    if (converteDto.statuses !== undefined) {
      const payload = {
        provider: converteDto.provider,
        business: converteDto.business,
        statuses: converteDto.statuses,
      };
      this.redis.set("wa-update-status" + createId(), JSON.stringify(payload));
      return;
    }

    // TODO: Verificar se o cliente já está em atendimento ou está e a primeira mensagem.
    const chatAlreadyExists = true; // CRIAR AS ROTAS

    if (!chatAlreadyExists) {
      // ENVIAR O CLIENTE PARA O CHATBOT E CRIAR UM 'CHAT'
      return;
    }

    if (/* chatAlreadyExists.attendant*/ false) {
      // ENVIAR PARA O MICRO-SERVIÇO DE ATENDIMENTO HUMANO
      return;
    }

    // TODO: Verificar se o cliente está conversando com o chatbot ou já está com um atendente.
    const chat = "";

    this.rabbitMQToChat.emit(env.RABBITMQ_QUEUE_CHAT, {
      provider: converteDto.provider,
      business: converteDto.business,
      contact: converteDto.contact,
      message: converteDto.message,
    });

    const businessId = "";
    const accessToken =
      "EAAIU7bqLvE4BO6WPCFhNheVqlOgaS0ZBPmLD2NyvJqVv4eLvOJggXzVEwBXKUHC3arWr3ZBKYi3Ky7F6Dh4WylhrQdd6DKpTz3XfwKSlyr5PZCSvZBuZAxOZC52q2PKaZBejb8JbGDZB1s9o1XFcT4rr6mEZB4KMefYf6kbUBMhgWZA3FOPfEWaGmnmZCFzHckjvanP7aJiO3cHJ3CIPalpHTsZC0bg3wCBhJPkM7ZBC4eiiwgYUZD";
    const data = {
      messaging_product: converteDto.provider,
      to: converteDto.contact.id,
      type: "text",
      text: {
        body: "Teste 2",
      },
    };
    await this.sendMessage(businessId, accessToken, data);
  }

  async sendMessage(businessId: string, accessToken: string, data: any) {
    const url = `${env.META_URL}/${businessId}/messages?access_token=${accessToken}`;
    await this.axiosService.post(url, data);
  }
}
