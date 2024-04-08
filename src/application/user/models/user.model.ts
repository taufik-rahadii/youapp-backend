import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { createRandomString } from '../../../utils/createRandomString';
import { Gender } from '../enums/gender.enum';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  _id: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class User {
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
  @ApiProperty()
  @Expose()
  fullname?: string;

  @Prop()
  @ApiProperty()
  @Expose()
  username?: string;

  @Prop()
  @Exclude()
  @Expose()
  password: string;

  @Prop()
  @ApiProperty()
  @Expose()
  email?: string;

  @Prop({
    default: '',
  })
  @ApiProperty()
  @Expose()
  gender?: Gender;

  @Prop({
    default: '',
  })
  @ApiProperty()
  @Expose()
  dob?: string;

  @Prop({
    default: null,
  })
  @ApiProperty()
  @Expose()
  height?: number;

  @Prop({
    default: null,
  })
  @ApiProperty()
  @Expose()
  weight?: number;

  @Prop({
    type: String,
    default: null,
  })
  @ApiProperty()
  @Expose()
  zodiac?: ZodiacAnimal;

  @Prop({
    type: String,
    default: null,
  })
  @ApiProperty()
  @Expose()
  horoscope?: HoroscopeSign;

  @Prop({
    default: null,
  })
  @ApiProperty()
  @Expose()
  avatar?: string;

  @Prop()
  @ApiProperty()
  @Expose()
  interest?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
