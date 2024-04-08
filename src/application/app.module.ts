import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatMessageEvent } from './chat/gateways/chat-message.event';
import { CalculationService } from './criterias/services/calculation.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (env: ConfigService) => ({
        uri: env.get('MONGODB_URI'),
      }),
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),

    // application module
    UserModule,
    AuthModule,
    ChatModule,
    // ChatGateway
  ],
})
export class AppModule { }
