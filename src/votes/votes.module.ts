import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes.controller';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';
import { VotesGateway } from './votes.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  controllers: [VotesController],
  providers: [VotesService, VotesGateway],
  exports: [VotesService, VotesGateway],
})
export class VotesModule {} 