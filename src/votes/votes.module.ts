import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes.controller';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';
import { VotesGateway } from './votes.gateway';
import { ServiceType } from '../service-types/entities/service-type.entity';
import { ServiceTypesModule } from '../service-types/service-types.module';
import { Company } from '../companies/entities/company.entity';
import { CompaniesModule } from '../companies/companies.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote, ServiceType, Company, User]),
    ServiceTypesModule,
    CompaniesModule,
    UsersModule
  ],
  controllers: [VotesController],
  providers: [VotesService, VotesGateway],
  exports: [VotesService, VotesGateway],
})
export class VotesModule {} 