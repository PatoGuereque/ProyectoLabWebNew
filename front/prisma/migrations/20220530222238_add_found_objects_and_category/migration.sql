-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNCLAIMED', 'CLAIMED');

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundobject" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "reporting_user_id" TEXT NOT NULL,
    "date_found" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "comments" TEXT,
    "status" "Status" NOT NULL DEFAULT E'UNCLAIMED',
    "claimed_user_id" TEXT,

    CONSTRAINT "foundobject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "foundobject" ADD CONSTRAINT "foundobject_reporting_user_id_fkey" FOREIGN KEY ("reporting_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundobject" ADD CONSTRAINT "foundobject_claimed_user_id_fkey" FOREIGN KEY ("claimed_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundobject" ADD CONSTRAINT "foundobject_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundobject" ADD CONSTRAINT "foundobject_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
