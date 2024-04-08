import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { createRandomString } from 'src/utils/createRandomString';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({
  _id: false,
})
export class ChatRoom {
  @Prop({
    type: String,
    default: createRandomString(26, 'a0'),
  })
  @ApiProperty()
  @Expose()
  _id?: string;

  @Prop({
    default: '',
  })
  title: string;

  @Prop()
  members: string[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
