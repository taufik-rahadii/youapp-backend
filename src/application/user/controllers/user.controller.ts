import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterDTO } from '../dtos/register.dto';
import { Userinfo } from '../../../core/decorators/userinfo.decorator';
import { JwtAuthGuard } from '../../../core/guards/auth.guard';
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

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @ApiTags('User')
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Register Success',
    schema: swaggerResponseSchema({
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
        _id: {
          type: 'string',
        },
      },
    }),
  })
  @ApiUnprocessableEntityResponse(swaggerErrorValidationErrorSchema())
  register(@Body() payload: RegisterDTO) {
    return this.userService.register(payload);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('User')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Get User Profile',
    schema: swaggerResponseSchema({
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
      },
    }),
  })
  public getProfile(@Userinfo('userId') id: string) {
    return this.userService.userProfile(id);
  }
}
