import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatRoom } from '../models/chat-room.model';
import { Model } from 'mongoose';
import { ChatMessage } from '../models/message.model';
import { CreateChatRoomDTO } from '../dtos/create-chat-room.dto';
import { SendMessageDTO } from '../dtos/send-message.dto';
import { ChatMessageEvent } from '../gateways/chat-message.event';
import { PublishMessageDTO } from '../dtos/publish-message.dto';
import { createRandomString } from 'src/utils/createRandomString';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatRoom.name) private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel(ChatMessage.name)
    private readonly chatMessageModel: Model<ChatMessage>,
    private readonly chatEvent: ChatMessageEvent,
  ) { }

  // create chat room
  public createChatRoom(senderId: string, payload: CreateChatRoomDTO) {
    const chatRoom: ChatRoom = {
      title: payload.title,
      members: [senderId, ...payload.receiverIds],
    };

    return this.chatRoomModel.create(chatRoom);
  }

  // get chat rooms by userId
  public getChatRooms(userId: string) {
    return this.chatRoomModel
      .aggregate([
        {
          $lookup: {
            from: 'messages',
            let: { chatRoomId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$chatRoomId', '$$chatRoomId'],
                  },
                },
              },
              {
                $sort: { sentAt: -1 },
              },
            ],
            as: 'latestMessage',
          },
        },
        {
          $match: {
            members: userId,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            latestMessage: { $arrayElemAt: ['$latestMessage', 0] },
          },
        },
        {
          $sort: { 'latestMessage.sentAt': -1 },
        },
      ])
      .exec();
  }

  public getChatMessageByChatRoom(chatRoomId: string) {
    return this.chatMessageModel
      .find({
        chatRoomId,
      })
      .sort({ sentAt: -1 }); // sort by sentAt DESC
  }

  private async dispatchSendMessageEvent(
    chatRoom: ChatRoom,
    payload: ChatMessage,
  ) {
    const members = chatRoom.members.filter(
      (member) => member !== payload.senderId,
    );

    for (const member of members) {
      this.chatEvent.emitMessageSent({
        message: payload.message,
        receiverId: member,
        sender: { _id: payload.senderId },
        chatRoomId: chatRoom._id,
      } as PublishMessageDTO);
    }

    return;
  }

  public async sendMessage(chatRoomId: string, payload: SendMessageDTO) {
    const chatRoom = await this.chatRoomModel.findById(chatRoomId);
    const message = await this.chatMessageModel.create({
      _id: createRandomString(26, 'a0'),
      chatRoomId,
      message: payload.message,
      senderId: payload.senderId,
    });

    await this.dispatchSendMessageEvent(chatRoom, message);

    return;
  }
}
