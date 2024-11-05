-- CreateEnum
CREATE TYPE "client_social_media_type" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "message_type" AS ENUM ('AUDIO', 'BUTTON', 'DOCUMENT', 'TEXT', 'IMAGE', 'INTERACTIVE', 'ORDER', 'STICKER', 'SYSTEM', 'UNKNOWN', 'VIDEO', 'REACTION', 'LOCATION');

-- CreateEnum
CREATE TYPE "message_status_type" AS ENUM ('DELIVERED', 'SENT', 'READ');

-- CreateEnum
CREATE TYPE "chat_type" AS ENUM ('WHATSAPP', 'MESSENGER', 'INSTAGRAM');

-- CreateTable
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled_at" TIMESTAMP(3),

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meta_app" (
    "id" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,

    CONSTRAINT "meta_app_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meta_whatsapp" (
    "id" TEXT NOT NULL,
    "number_phone" TEXT NOT NULL,
    "number_phone_id" TEXT NOT NULL,
    "wa_business_id" TEXT NOT NULL,
    "meta_app_id" TEXT NOT NULL,

    CONSTRAINT "meta_whatsapp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled_at" TIMESTAMP(3),
    "business_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "disabled_at" TIMESTAMP(3),
    "business_id" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_social_media" (
    "id" TEXT NOT NULL,
    "type" "client_social_media_type" NOT NULL,
    "username" TEXT NOT NULL,
    "social_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "customer_social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "type" "chat_type" NOT NULL,
    "business_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "type" "message_type" NOT NULL,
    "body" JSONB NOT NULL,
    "reactions" TEXT[],
    "integrationId" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_status" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "message_status_type" NOT NULL,
    "message_id" TEXT NOT NULL,

    CONSTRAINT "message_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_id_key" ON "business"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_code_key" ON "business"("code");

-- CreateIndex
CREATE INDEX "business_id_idx" ON "business"("id");

-- CreateIndex
CREATE INDEX "business_code_idx" ON "business"("code");

-- CreateIndex
CREATE UNIQUE INDEX "meta_app_id_key" ON "meta_app"("id");

-- CreateIndex
CREATE UNIQUE INDEX "meta_app_app_id_key" ON "meta_app"("app_id");

-- CreateIndex
CREATE INDEX "meta_app_app_id_idx" ON "meta_app"("app_id");

-- CreateIndex
CREATE INDEX "meta_app_app_id_business_id_idx" ON "meta_app"("app_id", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_id_key" ON "meta_whatsapp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_number_phone_key" ON "meta_whatsapp"("number_phone");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_number_phone_id_key" ON "meta_whatsapp"("number_phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_wa_business_id_key" ON "meta_whatsapp"("wa_business_id");

-- CreateIndex
CREATE INDEX "meta_whatsapp_number_phone_idx" ON "meta_whatsapp"("number_phone");

-- CreateIndex
CREATE INDEX "meta_whatsapp_number_phone_id_idx" ON "meta_whatsapp"("number_phone_id");

-- CreateIndex
CREATE INDEX "meta_whatsapp_wa_business_id_idx" ON "meta_whatsapp"("wa_business_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE INDEX "users_code_business_id_idx" ON "users"("code", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_business_id_key" ON "users"("code", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- CreateIndex
CREATE INDEX "customers_id_idx" ON "customers"("id");

-- CreateIndex
CREATE INDEX "customers_code_business_id_idx" ON "customers"("code", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_code_business_id_key" ON "customers"("code", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_social_media_id_key" ON "customer_social_media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_social_media_social_id_key" ON "customer_social_media"("social_id");

-- CreateIndex
CREATE INDEX "customer_social_media_id_idx" ON "customer_social_media"("id");

-- CreateIndex
CREATE INDEX "customer_social_media_username_idx" ON "customer_social_media"("username");

-- CreateIndex
CREATE INDEX "customer_social_media_social_id_idx" ON "customer_social_media"("social_id");

-- CreateIndex
CREATE UNIQUE INDEX "chats_id_key" ON "chats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "chats_code_business_id_key" ON "chats"("code", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "messages_id_key" ON "messages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "messages_integrationId_key" ON "messages"("integrationId");

-- CreateIndex
CREATE INDEX "messages_chat_id_idx" ON "messages"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_status_id_key" ON "message_status"("id");

-- AddForeignKey
ALTER TABLE "meta_app" ADD CONSTRAINT "meta_app_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meta_whatsapp" ADD CONSTRAINT "meta_whatsapp_meta_app_id_fkey" FOREIGN KEY ("meta_app_id") REFERENCES "meta_app"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_social_media" ADD CONSTRAINT "customer_social_media_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_status" ADD CONSTRAINT "message_status_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
