import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDTO {
  senderId?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value).trim()) // trim message content
  message: string;
}
