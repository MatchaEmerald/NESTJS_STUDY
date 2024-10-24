import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TestModule, UploadModule, LoginModule],
})
export class AppModule {}
