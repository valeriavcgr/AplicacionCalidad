import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports:[
  ConfigModule.forRoot({isGlobal: true})
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
