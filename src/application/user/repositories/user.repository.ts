import { Injectable } from '@nestjs/common';
import { InjectModel, Prop } from '@nestjs/mongoose';
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
  public async updateUser(_id: string, payload: Partial<User>) {
    await this.userModel.findByIdAndUpdate(
      {
        _id,
      },
      { ...payload },
      { new: false },
    );

    return {
      _id,
    };
  }

  // FindByID
  public findById(_id: string, withPassword = true) {
    const query = this.userModel.findOne({ _id });

    if (!withPassword) query.select('-password');

    return query.exec();
  }
}
