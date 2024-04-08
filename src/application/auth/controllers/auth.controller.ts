import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO, LoginResponse } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  swaggerErrorValidationErrorSchema,
  swaggerResponseSchema,
} from 'src/utils/swaggerResponseSchema';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';
import { Userinfo } from 'src/core/decorators/userinfo.decorator';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth')
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
  @ApiUnprocessableEntityResponse(swaggerErrorValidationErrorSchema())
  public login(@Body() payload: LoginDTO): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @Post('/refresh')
  @ApiBearerAuth()
  @ApiTags('Auth')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Generate refresh token',
    schema: swaggerResponseSchema({
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
      },
    }),
  })
  @UseGuards(JwtAuthGuard)
  public refresh(@Userinfo('userId') userId: string) {
    return this.authService.generateAccessRefreshToken(userId);
  }
}
