import { join } from 'path';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Response as NestResponse } from './common/response';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

const whiteList = ['/test', '/upload/album'];
function middleWareAll(req: Request, res: Response, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send({ msg: '拦截' });
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('接口文档')
    .setDescription('接口文档')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.useGlobalFilters(new HttpFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new NestResponse());
  app.useStaticAssets(join(__dirname, 'images'), { prefix: '/images' });

  app
    .use(cors())
    // .use(middleWareAll)
    .use(
      session({
        rolling: true,
        secret: 'Matcha',
        name: 'MatchaSid',
        cookie: { maxAge: 999999 },
      }),
    );
  await app.listen(3000);


}
bootstrap();


