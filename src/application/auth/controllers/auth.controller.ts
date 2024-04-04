import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO, LoginResponse } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { swaggerResponseSchema } from 'src/utils/swaggerResponseSchema';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Login success',
    schema: swaggerResponseSchema({
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
      },
    }),
  })
  public login(@Body() payload: LoginDTO): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @Post('/refresh')
  public refresh() { }
}
