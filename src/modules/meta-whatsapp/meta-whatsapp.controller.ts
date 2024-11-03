import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import { MetaWhatsappDto } from "./dtos/meta-whatsapp.received.dto";
import { MetaWhatsappService } from "./meta-whatsapp.service";

@Controller("meta-whatsapp")
export class MetaWhatsappController {
  constructor(private readonly service: MetaWhatsappService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  validate(
    @Query("hub.mode") mode: string,
    @Query("hub.verify_token") verifyToken: string,
    @Query("hub.challenge") challenge: any,
  ) {
    return this.service.handlerValidation(mode, verifyToken, challenge);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  post(@Body() body: MetaWhatsappDto): Promise<void> {
    this.service.handlerWhatsapp(body);
    return;
  }
}
