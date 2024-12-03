import { Logger } from 'src/middleware';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { Tags } from './entities/tags.entity';
import { Test } from './entities/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TestService],
  controllers: [TestController],
  imports: [TypeOrmModule.forFeature([Test, Tags])],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes(TestController);
  }
}
