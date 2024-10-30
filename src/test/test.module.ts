import { Logger } from 'src/middleware';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { Test } from './entities/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TestService],
  controllers: [TestController],
  imports: [TypeOrmModule.forFeature([Test])],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes(TestController);
  }
}
