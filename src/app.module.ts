import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UploadModule } from './upload/upload.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TestModule, UploadModule],
})
export class AppModule {}