import { join } from 'path';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

const whiteList = ['/test', '/upload/album'];

function middleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);

  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send({ msg: '拦截' });
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), { prefix: '/images' });
  app
    .use(cors())
    .use(middleWareAll)
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
