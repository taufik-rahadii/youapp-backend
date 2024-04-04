import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) { }

  protected createFolderIsNotExist(folderName: string) {
    try {
      // Check if the folder already exists
      if (existsSync(folderName)) {
        return true;
      }

      // Create the folder and its parents if they don't exist
      mkdirSync(folderName, { recursive: true });

      return true;
    } catch (error) {
      Logger.error(error, this.constructor.name);
      return false;
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    filename?: string,
  ): Promise<string> {
    try {
      // Generate a unique filename
      const fileName = filename ?? file.originalname;
      // Save the file to the upload directory
      writeFileSync(
        join(this.configService.get('PUBLIC_FOLDER_PATH'), fileName),
        file.buffer,
      );

      return fileName;
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }
}
