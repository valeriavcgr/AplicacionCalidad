import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports:[
  ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forFeature([User]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret:config.get<string>('JWT_SECRET_KEY'),
      signOptions: {expiresIn:config.get<number>('JWT_EXPIRES_IN')|| '1h'} 
    })
  })
],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
