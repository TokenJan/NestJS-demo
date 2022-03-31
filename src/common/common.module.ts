import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CouchbaseConnectionConfig, CouchbaseModule } from 'nestjs-ottoman';

import configuration from './configuration';
import {
  CONFIG_HTTP_TIMEOUT,
} from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: +configService.get(CONFIG_HTTP_TIMEOUT),
      }),
      inject: [ConfigService],
    }),
    CouchbaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get<CouchbaseConnectionConfig>('couchbase', { infer: true });
      },
      inject: [ConfigService],
    }),
  ],
  exports: [ConfigModule, HttpModule, CouchbaseModule],
})
export class CommonModule {}
