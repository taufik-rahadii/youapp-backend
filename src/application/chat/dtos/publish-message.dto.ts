import { User } from 'src/application/user/models/user.model';

export class PublishMessageDTO {
  message: string;
  sender: User;
  receiverId: string;
  chatRoomId: string;
}
