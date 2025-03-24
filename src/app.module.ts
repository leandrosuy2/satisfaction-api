import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ServiceTypesModule } from './service-types/service-types.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ServiceTypesModule,
    CompaniesModule,
    UsersModule,
    QuestionsModule,
    QuestionnairesModule,
    WebsocketModule,
  ],
})
export class AppModule {}