import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../services/user.service';
import { RegisterDTO } from '../dtos/register.dto';
import { Userinfo } from '../../../core/decorators/userinfo.decorator';
import { JwtAuthGuard } from '../../../core/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  swaggerErrorValidationErrorSchema,
  swaggerResponseSchema,
} from 'src/utils/swaggerResponseSchema';
import { UpdateProfileDTO } from '../dtos/update-profile.dto';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('updateProfile')
  @ApiTags('Profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update user profile',
  })
  updateProfile(
    @Userinfo('userId') id: string,
    @Body() payload: UpdateProfileDTO,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.updateProfile(id, {
      ...payload,
      avatar: avatar.filename,
    });
  }

  @Post('createProfile')
  @ApiTags('Profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create or update user profile',
  })
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
  createProfile(
    @Userinfo('userId') id: string,
    @Body() payload: UpdateProfileDTO,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.updateProfile(id, {
      ...payload,
      avatar: avatar.filename,
    });
  }

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
  @ApiOperation({
    summary: 'register user',
  })
  @ApiUnprocessableEntityResponse(swaggerErrorValidationErrorSchema())
  register(@Body() payload: RegisterDTO) {
    return this.userService.register(payload);
  }

  @Get('getProfile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('Profile')
  @ApiOperation({
    summary: 'get user profile',
  })
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
