import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
    controllers: [AppController], // ✅ precisa estar aqui
    providers: [],
})
export class AppPublic { }