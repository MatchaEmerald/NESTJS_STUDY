import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TestModule, UploadModule, LoginModule, GuardModule],
})
export class AppModule {}
