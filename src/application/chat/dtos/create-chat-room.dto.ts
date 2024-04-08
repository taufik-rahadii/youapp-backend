import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatRoomDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  receiverIds: string[];
}
