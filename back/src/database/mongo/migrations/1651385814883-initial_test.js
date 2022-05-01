export const up = async (db) => {
  await db.createCollection('tests');
  await db.collection('tests').insertOne({
    success: true,
  });
};

export const down = async () => {};
