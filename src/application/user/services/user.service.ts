import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { RegisterDTO } from '../dtos/register.dto';
import { User } from '../models/user.model';
import { genSaltSync, hashSync } from 'bcrypt';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { StorageService } from '../../../storage/storage.service';
import { AuthService } from 'src/application/auth/services/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly storageService: StorageService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) { }

  // Register
  public async register(payload: RegisterDTO) {
    const password = this.hashPassword(payload.password);

    const user = await this.userRepo.register({
      ...payload,
      password,
    });

    const tokens = this.authService.generateAccessRefreshToken(user._id);

    return {
      _id: user._id,
      ...tokens,
    };
  }

  private hashPassword(plain: string) {
    return hashSync(plain, genSaltSync(12));
  }

  // FindByUsernameOrEmail
  public findByUsernameOrEmail(value: string, type: 'email' | 'username') {
    return this.userRepo.findByUsernameOrEmail(value, type);
  }

  // UpdateUser
  public async updateUser(id: string, payload: UpdateUserDTO) {
    const user = await this.userRepo.findById(id);
    let avatar = user.avatar;

    if (payload.avatar)
      avatar = await this.storageService.uploadFile(payload.avatar);

    return this.userRepo.updateUser(id, {
      ...user,
      ...payload,
      avatar,
    });
  }

  // FindByID
  public findById(id: string) {
    return this.userRepo.findById(id);
  }

  public async userProfile(id: string) {
    const user = await this.userRepo.findById(id, false);

    return user;
  }
}
