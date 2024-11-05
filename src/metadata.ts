/* eslint-disable */
export default async () => {
  const t = {};
  return {
    "@nestjs/swagger": {
      models: [],
      controllers: [
        [
          import("./providers/meta-whatsapp/meta-whatsapp.controller"),
          { MetaWhatsappController: { validate: { type: Object }, post: {} } },
        ],
      ],
    },
  };
};
