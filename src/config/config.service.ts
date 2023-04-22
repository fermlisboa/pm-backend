import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const enviroemnt = this.getValue('ENVIROEMNT', false);
    return enviroemnt != 'DEV';
  }

  public isSynchronize() {
    const synchronize = this.getValue('POSTGRES_SYNCHRONIZE', false);
    return synchronize == 'true';
  }

  public isLogging() {
    const logging = this.getValue('POSTGRES_LOGGING', false);
    return logging == 'true';
  }

  public migrationRun() {
    const runMigration = this.getValue('TYPEORM_MIGRATIONS_RUN', false);
    return runMigration == 'true';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [join(__dirname, '../**/*.entity{.ts,.js}')],

      migrationsTableName: 'migrations',

      migrations: [join(__dirname, '../migrations/*{.ts,.js}')],

      cli: {
        migrationsDir: 'src/migrations',
      },

      ssl: false,

      synchronize: this.isSynchronize(),

      migrationsRun: this.migrationRun(),

      logging: this.isLogging(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'TYPEORM_MIGRATIONS_RUN',
]);

export { configService };
