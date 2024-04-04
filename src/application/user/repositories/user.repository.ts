import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  // Register
  public register(payload: User): Promise<User> {
    return this.userModel.create(payload);
  }

  // FindByUsernameOrEmail
  public async findByUsernameOrEmail(
    value: string,
    type: 'email' | 'username',
  ): Promise<User> {
    const user = await this.userModel.findOne({
      [type]: value,
    });

    if (!user) throw new Error(`User with ${type} '${value}' is not exists`);

    return user;
  }

  // UpdateUser
  public updateUser(id: string, payload: User) {
    return this.userModel.updateOne(
      {
        id,
      },
      payload,
    );
  }

  // FindByID
  public findById(id: string) {
    return this.userModel.findById(id);
  }
}
