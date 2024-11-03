import { HttpService } from "@nestjs/axios";
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Converter } from "src/utils/converter.util";
import { env } from "../../configs/env";
import { MetaWhatsappDto } from "./dtos/meta-whatsapp.received.dto";

@Injectable()
export class MetaWhatsappService {
  constructor(
    @Inject(env.RABBITMQ_NAME) private readonly rabbitMQ: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  handlerValidation(mode: string, verifyToken: string, challenge: any) {
    const subscribeMode = mode === "subscribe";
    const tokenMatch = verifyToken === env.WHATSAPP_VERIFY_TOKEN;

    if (subscribeMode && tokenMatch) return challenge;

    Logger.error("Validação do WhatsApp falhou", "MetaWhatsappController");
    throw new BadRequestException();
  }

  handlerWhatsapp(dto: MetaWhatsappDto) {
    const businessAlreadyExists = true; // TODO: Validar se a empresa tem cadastro no sistema no banco de dados.
    // USAR REDIS PARA ARMAZENAR AS EMPRESAS PARA NÃO PRECISAR BUSCAR NO BANCO DE DADOS TODA HORA.
    if (!businessAlreadyExists) return;

    const converteDto = Converter.waToBodyDefault(dto);

    console.log("converteDto", converteDto);

    if (converteDto.statuses !== undefined) {
      // Enviar para micro-serviço que trata/atualiza os status.
      this.rabbitMQ.emit(env.RABBITMQ_QUEUE, {
        provider: converteDto.provider,
        business: converteDto.business,
        statuses: converteDto.statuses,
      });
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

    this.httpService
      .post(
        "https://graph.facebook.com/v20.0/279265205263818/messages?access_token=EAAIU7bqLvE4BOz2UPZBWji8wUS4lZCh0ZC9FYTOyj9cQoOCybacTylwbh4v76oZBTWFuQ4J9WSwk9KKkT8LRXZAqooEpuYx290EnR5TdZBPclHpq3Y2Bk7sjuIUAOZBLHyZBC8aYs4Gf8f76T1rVgk9hiFYY1ZBSQ0dfgPJe8QbPZAJd5Wt7NJhLHTwbHb2BcPzSwwSSwuZCfzVPRfKdksmpxqlCiT7WrHqppZCG82ABgZBbuwBQZD",
        {
          messaging_product: converteDto.provider,
          to: converteDto.contact.id,
          type: "text",
          text: {
            body: "Teste 2",
          },
        },
      )
      .subscribe((p) => console.log(p));
  }
}
