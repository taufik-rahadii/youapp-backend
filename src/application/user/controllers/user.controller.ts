import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterDTO } from '../dtos/register.dto';
import { Userinfo } from '../../../core/decorators/userinfo.decorator';
import { JwtAuthGuard } from '../../../core/guards/auth.guard';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  register(@Body() payload: RegisterDTO) {
    return this.userService.register(payload);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Userinfo('id') id: string) {
    return this.userService.findById(id);
  }
}
