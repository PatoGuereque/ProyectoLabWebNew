const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const campus = [
  'Aguascalientes',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Ciudad Juárez',
  'Ciudad Obregón',
  'Cuernavaca',
  'Estado de México',
  'Guadalajara',
  'Hidalgo',
  'Irapuato',
  'Laguna',
  'León',
  'Monterrey',
  'Morelia',
  'Puebla',
  'Querétaro',
  'Saltillo',
  'San Luis Potosí',
  'Santa Fe',
  'Sinaloa',
  'Sonora Norte',
  'Tampico',
  'Toluca',
  'Zacatecas',
  'Otro',
];

const ubicaciones = [
  'Aulas 1',
  'Aulas 2',
  'Aulas 3',
  'Aulas 4',
  'Aulas 6',
  'Aulas 7',
  'Biblio',
  'Centrales',
  'Jubileo',
  'Rectoría',
  'Otro',
];

const categorias = [
  'Audífonos',
  'Cartera',
  'Computadora',
  'Llaves',
  'Mochila',
  'Teléfono',
  'Termo',
  'Otro',
];

async function main() {
  await prisma.$transaction(
    campus.map((campusName) =>
      prisma.campus.upsert({
        where: {
          name: campusName,
        },
        update: {},
        create: {
          name: campusName,
        },
      })
    )
  );

  const mty = await prisma.campus.findFirst({
    where: {
      name: 'Monterrey',
    },
  });

  await prisma.$transaction(
    ubicaciones.map((ubicacion) =>
      prisma.location.upsert({
        where: {
          campusId_name: {
            campusId: mty.id,
            name: ubicacion,
          },
        },
        update: {},
        create: {
          name: ubicacion,
          campusId: mty.id,
        },
      })
    )
  );

  await prisma.$transaction(
    categorias.map((category) =>
      prisma.category.upsert({
        where: {
          name: category,
        },
        update: {},
        create: {
          name: category,
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
