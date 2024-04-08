import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';
import { Userinfo } from 'src/core/decorators/userinfo.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateChatRoomDTO } from '../dtos/create-chat-room.dto';
import { SendMessageDTO } from '../dtos/send-message.dto';
import { swaggerResponseSchema } from 'src/utils/swaggerResponseSchema';

@Controller('/v1/chat')
@UseGuards(JwtAuthGuard)
@ApiTags('Chat')
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  //create chat room
  @Post('/room')
  @ApiOperation({
    summary: 'create chat room',
  })
  public createChatRoom(
    @Userinfo('userId') userId: string,
    @Body() payload: CreateChatRoomDTO,
  ) {
    return this.chatService.createChatRoom(userId, payload);
  }

  // get chat room by authenticated user
  @Get('/room')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Success',
    schema: swaggerResponseSchema({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
        },
      },
    }),
  })
  @ApiOperation({
    summary: 'get chat room sorted by last message',
  })
  public getChatRoom(@Userinfo('userId') userId: string) {
    return this.chatService.getChatRooms(userId);
  }

  // get chat messages by chat room
  @Get('/:roomId/viewMessages')
  @ApiOperation({
    summary: 'get chat message by chat room',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: swaggerResponseSchema({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          senderId: {
            type: 'string',
          },
          chatRoomId: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          sentAt: {
            type: 'string',
          },
        },
      },
    }),
  })
  public getChatMessages(@Param('roomId') roomId: string) {
    return this.chatService.getChatMessageByChatRoom(roomId);
  }

  @Post('/:roomId/sendMessage')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Success',
  })
  @ApiOperation({
    summary: 'send chat message',
  })
  public sendMessage(
    @Param('roomId') roomId: string,
    @Userinfo('userId') senderId: string,
    @Body() payload: SendMessageDTO,
  ) {
    return this.chatService.sendMessage(roomId, { ...payload, senderId });
  }
}
