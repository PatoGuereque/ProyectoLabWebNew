-- CreateTable
CREATE TABLE "campus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "campus_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "campus_name_key" ON "campus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_campus_id_name_key" ON "location"("campus_id", "name");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
