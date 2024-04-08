import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from 'src/application/user/services/user.service';
import { LoginDTO, LoginResponse } from '../dtos/login.dto';
import { JWTPayloadDTO } from '../dtos/jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  public async login(payload: LoginDTO): Promise<LoginResponse> {
    try {
      const { usernameOrEmail, password } = payload;

      // find user by credentials
      const { _id, password: encrypted } =
        await this.userService.findByUsernameOrEmail(
          usernameOrEmail,
          this.findCredentialType(payload),
        );

      // compare its password
      const compare = compareSync(password, encrypted);

      // sign access & refresh token
      const { accessToken, refreshToken } =
        this.generateAccessRefreshToken(_id);

      // return data
      return {
        id: _id,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  public generateAccessRefreshToken(userId: string): {
    accessToken: string;
    refreshToken: string;
  } {
    const [accessToken, refreshToken] = [
      this.signToken({ userId }),
      this.signToken({ userId, type: 'refresh' }, '183d'), // 6 months
    ];

    return { accessToken, refreshToken };
  }

  private findCredentialType({
    usernameOrEmail,
  }: LoginDTO): 'email' | 'username' {
    if (isEmail(usernameOrEmail)) return 'email';

    return 'username';
  }

  private signToken(payload: JWTPayloadDTO, expiresIn = '10m') {
    return this.jwtService.sign(payload, {
      issuer: payload.userId,
      expiresIn,
    });
  }
}
