import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import { MetaWhatsappService } from "./meta-whatsapp.service";
import { MetaWhatsappDto } from "./dtos/meta-whatsapp.received.dto";

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
    console.log({
      mode,
      verifyToken,
      challenge,
    });
    return this.service.handlerValidation(mode, verifyToken, challenge);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  post(@Body() body: MetaWhatsappDto): Promise<void> {
    console.log(body);
    return this.service.handlerWhatsapp(body);
  }
}
