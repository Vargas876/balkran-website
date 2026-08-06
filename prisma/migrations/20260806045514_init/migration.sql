-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('ENERGIZADORES', 'KITS_SOLARES', 'ACCESORIOS');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NUEVO', 'VISTO', 'CONTACTADO', 'CERRADO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "linea" TEXT NOT NULL,
    "categoria" "ProductCategory" NOT NULL,
    "precio" TEXT NOT NULL,
    "precioNumerico" DOUBLE PRECISION NOT NULL,
    "imagen_local" TEXT NOT NULL,
    "imagen_url_original" TEXT,
    "subtitulo" TEXT,
    "alcance" TEXT,
    "joules" TEXT,
    "voltaje" TEXT,
    "descripcion" TEXT,
    "ideal_para" TEXT,
    "alimentacion" TEXT,
    "consumo" TEXT,
    "cobertura" TEXT,
    "energia_salida" TEXT,
    "voltaje_salida" TEXT,
    "pulsos_minuto" TEXT,
    "varillas_tierra" TEXT,
    "autonomia" TEXT,
    "peso" TEXT,
    "dimensiones" TEXT,
    "material" TEXT,
    "color" TEXT,
    "presentacion" TEXT,
    "capacidad" TEXT,
    "longitud" TEXT,
    "esMasVendido" BOOLEAN NOT NULL DEFAULT false,
    "esPopular" BOOLEAN NOT NULL DEFAULT false,
    "esNuevo" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valoraciones" INTEGER NOT NULL DEFAULT 0,
    "url" TEXT,
    "caracteristicas" TEXT[],
    "recomendado_para" TEXT[],
    "imagenes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NUEVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "ChatMessage_sessionId_idx" ON "ChatMessage"("sessionId");
