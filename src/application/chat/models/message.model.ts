import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { createRandomString } from 'src/utils/createRandomString';

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema({
  _id: false,
  timestamps: {
    createdAt: 'sentAt',
    updatedAt: false,
  },
})
export class ChatMessage {
  @Prop({
    type: String,
    default: createRandomString(26, 'a0'),
  })
  @ApiProperty()
  _id?: string;

  @Prop()
  senderId: string;

  @Prop()
  chatRoomId: string;

  @Prop()
  sentAt?: Date;

  @Prop()
  message: string;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
