import { config } from "dotenv";
import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import configuration from "../configuration/configuration"
import { JobOffer } from "src/job-offers/job-offer.entity";
config();
const configService = new ConfigService(configuration());

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.database'),
    entities: [JobOffer],
    synchronize: configService.get('database.synchronize'),
    migrations: configService.get('database.migrations'),
    migrationsRun:  configService.get('database.migrationsRun'),
    logging: configService.get('database.logging'),
});


export default AppDataSource
