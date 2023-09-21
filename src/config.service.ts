// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv?.config({ path: '.env' });

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('PGHOST'),
      port: parseInt(this.getValue('PGPORT')),
      username: this.getValue('PGUSER'),
      password: this.getValue('PGPASSWORD'),
      database: this.getValue('PGDATABASE'),
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PGHOST',
  'PGPORT',
  'PGUSER',
  'PGPASSWORD',
  'PGDATABASE',
]);
export { configService };
