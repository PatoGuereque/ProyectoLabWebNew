import mongoose from 'mongoose';
import { config, up, database } from 'migrate-mongo';
import { join } from 'path';
import { mongodbUri } from '../../config';

const migrationPath = join(__dirname, 'migrations');

const migrationConfig = {
  mongodb: {
    url: mongodbUri,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },

  migrationsDir: migrationPath,
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'esm',
};

config.set(migrationConfig);

const connect = () =>
  database
    .connect()
    .then(({ db, client }) => {
      // eslint-disable-next-line no-console
      console.log('Connected to database, applying migrations');
      return up(db, client)
        .then((migrations) => {
          migrations.forEach((migration) => {
            // eslint-disable-next-line no-console
            console.log(`Migrated: ${migration}`);
          });
          // eslint-disable-next-line no-console
          console.log(`Applied ${migrations.length} migration(s)`);
        })
        .then(() => client.close());
    })
    .then(() => mongoose.connect(mongodbUri));

export { connect };
