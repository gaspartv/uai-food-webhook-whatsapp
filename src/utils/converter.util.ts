import { MetaWhatsappDto } from "../providers/meta-whatsapp/dtos/meta-whatsapp.received.dto";

export class Converter {
  static waToBodyDefault(dto: MetaWhatsappDto): any {
    const { entry } = dto;

    const display_phone_number = entry[0].id;

    const changes = entry[0].changes;

    const value = changes[0].value;

    const wa_metadata = value.metadata;
    const wa_business_id = wa_metadata && wa_metadata.display_phone_number;
    const phone_number_id = wa_metadata && wa_metadata.phone_number_id;

    const wa_statuses = value.statuses && value.statuses[0];
    const wa_contacts = value.contacts;
    const wa_id = wa_contacts && wa_contacts[0].wa_id;
    const wa_user_id = wa_contacts && wa_contacts[0]?.user_id;
    const wa_name = wa_contacts && wa_contacts[0].profile.name;

    const messages = value.messages;
    const wa_msg_id = messages && messages[0].id;
    const wa_msg_timestamp = messages && messages[0].timestamp;
    const wa_msg_type = messages && messages[0].type;
    const wa_msg_text = messages && messages[0].text && messages[0].text.body;
    const wa_msg_image = messages && messages[0].image && messages[0].image;
    const wa_msg_audio = messages && messages[0].audio && messages[0].audio;
    const wa_msg_contacts =
      messages && messages[0].contacts && messages[0].contacts;
    const wa_msg_document =
      messages && messages[0].document && messages[0].document;
    const wa_msg_errors = messages && messages[0].errors && messages[0].errors;
    const wa_msg_interactive =
      messages && messages[0].interactive && messages[0].interactive;
    const wa_msg_location =
      messages && messages[0].location && messages[0].location;
    const wa_msg_reaction =
      messages && messages[0].reaction && messages[0].reaction;
    const wa_msg_sticker =
      messages && messages[0].sticker && messages[0].sticker;
    const wa_msg_video = messages && messages[0].video && messages[0].video;
    const wa_msg_system = messages && messages[0].system && messages[0].system;
    const wa_msg_referral =
      messages && messages[0].referral && messages[0].referral;
    const wa_msg_order = messages && messages[0].order && messages[0].order;
    const wa_msg_identity =
      messages && messages[0].identity && messages[0].identity;
    const wa_msg_button = messages && messages[0].button && messages[0].button;
    const wa_msg_context =
      messages && messages[0].context && messages[0].context;

    return {
      provider: value.messaging_product,
      business: {
        id: display_phone_number,
        phoneNumber: wa_business_id,
        phoneNumberId: phone_number_id,
      },
      statuses: wa_statuses && {
        id: wa_statuses.id,
        status: wa_statuses.status,
        timestamp: wa_statuses.timestamp,
        recipientId: wa_statuses.recipient_id,
        conversation: wa_statuses.conversation,
        pricing: wa_statuses.pricing,
        errors: wa_statuses.errors,
        biz_opaque_callback_data: wa_statuses.biz_opaque_callback_data,
      },
      contact: wa_contacts && {
        id: wa_id,
        user_id: wa_user_id,
        name: wa_name,
      },
      message: messages && {
        id: wa_msg_id,
        timestamp: wa_msg_timestamp,
        type: wa_msg_type,

        audio: wa_msg_audio,
        button: wa_msg_button,
        context: wa_msg_context,
        document: wa_msg_document,
        image: wa_msg_image,
        interactive: wa_msg_interactive,
        sticker: wa_msg_sticker,
        text: wa_msg_text,
        video: wa_msg_video,
        reaction: wa_msg_reaction,
        location: wa_msg_location,
        contacts: wa_msg_contacts,

        system: wa_msg_system,
        referral: wa_msg_referral,
        order: wa_msg_order,
        identity: wa_msg_identity,
        errors: wa_msg_errors,
      },
      error: value.errors,
    };
  }
}
