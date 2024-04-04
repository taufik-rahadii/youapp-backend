import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { createRandomString } from '../../../utils/createRandomString';
import { Gender } from '../enums/gender.enum';

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
  _id?: string;

  @Prop()
  fullname?: string;

  @Prop()
  username?: string;

  @Prop()
  password: string;

  @Prop()
  email?: string;

  @Prop()
  gender?: Gender;

  @Prop()
  dob?: string;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;

  @Prop({
    type: String,
  })
  zodiac?: ZodiacAnimal;

  @Prop({
    type: String,
  })
  horoscope?: HoroscopeSign;

  @Prop()
  avatar?: string;

  @Prop()
  interest?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
