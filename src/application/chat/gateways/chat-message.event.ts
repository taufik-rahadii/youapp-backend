import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PublishMessageDTO } from '../dtos/publish-message.dto';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class ChatMessageEvent {
  private logger = new Logger('ChatMessageEvent');

  @WebSocketServer()
  server: Server;

  emitMessageSent(payload: PublishMessageDTO) {
    const eventName = `chat.${payload.chatRoomId}.${payload.receiverId}`;
    this.server.emit(eventName, payload);
    this.logger.log(
      `${eventName} Has Been Triggered | ${JSON.stringify(payload)}`,
    );
  }
}
