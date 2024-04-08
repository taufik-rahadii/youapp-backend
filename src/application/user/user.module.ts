import {
  Module,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { StorageService } from 'src/storage/storage.service';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CalculationService } from '../criterias/services/calculation.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './resources/uploads',
        filename: (_, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
      fileFilter: (_, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          // Reject a file that doesn't match jpg, jpeg, or png extensions
          return callback(
            new UnprocessableEntityException(
              'Only jpg, jpeg, or png files are allowed',
            ),
            false,
          );
        }
        if (file.size > 1024 * 1024) {
          // Reject a file if its size is greater than 1MB
          return callback(
            new UnprocessableEntityException('File size must be less than 1MB'),
            false,
          );
        }
        callback(null, true);
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, StorageService, CalculationService],
  exports: [UserService],
})
export class UserModule { }
