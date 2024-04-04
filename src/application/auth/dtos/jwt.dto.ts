export class JWTPayloadDTO {
  userId: string;
  type?: 'refresh' | 'token';
}
