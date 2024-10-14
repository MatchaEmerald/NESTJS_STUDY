import { Logger } from 'src/middleware';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes(TestController);
  }
}
