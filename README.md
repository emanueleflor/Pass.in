<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentação do Pass.in</title>
</head>
<body>
    <h1>Pass.in - Documentação do Sistema</h1>

    <h2>Requisitos Funcionais</h2>
    <ul>
        <li>O organizador deve poder cadastrar um novo evento;</li>
        <li>O organizador deve poder visualizar dados de um evento;</li>
        <li>O organizador deve poder visualizar a lista de participantes;</li>
        <li>O participante deve poder se inscrever em um evento;</li>
        <li>O participante deve poder visualizar seu crachá de inscrição;</li>
        <li>O participante deve poder realizar check-in no evento;</li>
    </ul>

    <h2>Regras de Negócio</h2>
    <ul>
        <li>O participante só pode se inscrever em um evento uma única vez;</li>
        <li>O participante só pode se inscrever em eventos com vagas disponíveis;</li>
        <li>O participante só pode realizar check-in em um evento uma única vez;</li>
    </ul>

    <h2>Requisitos Não-Funcionais</h2>
    <ul>
        <li>O check-in no evento será realizado através de um QRCode;</li>
    </ul>

    <h2>Documentação da API (Swagger)</h2>
    <p>Para documentação da API, acesse o link: <a href="https://nlw-unite-nodejs.onrender.com/docs">https://nlw-unite-nodejs.onrender.com/docs</a></p>

    <h2>Diagrama ERD do Banco de Dados</h2>
    <p>Inserir aqui uma imagem do Diagrama ERD do banco de dados</p>

    <h2>Estrutura do Banco de Dados (SQL)</h2>
    <pre><code>
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
    </code></pre>
</body>
</html>
