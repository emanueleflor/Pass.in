-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ateendee_id" INTEGER NOT NULL,
    CONSTRAINT "check_ins_ateendee_id_fkey" FOREIGN KEY ("ateendee_id") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_ateendee_id_key" ON "check_ins"("ateendee_id");
