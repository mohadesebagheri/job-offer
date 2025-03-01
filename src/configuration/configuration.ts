export default () => ({
  cronSchedule: process.env.CRON_SCHEDULE || '*/1 * * * *',
  app: {
    name: process.env.APPNAME,
    port: process.env.PORT,
    version: process.env.APPVERSION,
  },
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: (process.env.DB_PASSWORD ?? '').toString(),
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT ?? '3000'),
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    migrationsRun: false,
    migrations: ['src/database/migrations/*-migration.ts'],
    logging: false,
  },
  accountBasedBlockchain: {
    encryptionPassPhrase: process.env.ENCRYPTION_PASS_PHRASE,
  },
});
