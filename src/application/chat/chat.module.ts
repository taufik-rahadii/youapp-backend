import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomSchema } from './models/chat-room.model';
import { ChatMessage, ChatMessageSchema } from './models/message.model';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { ChatMessageEvent } from './gateways/chat-message.event';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, {
    provide: ChatMessageEvent,
    useClass: ChatMessageEvent
  }],
})
export class ChatModule { }
