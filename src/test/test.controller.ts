import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  Request,
  Controller,
  Res,
  Req,
  Session,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) { }

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.testService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(id);
  }

  @Get('query')
  findByQuery(@Query() query: any) {
    console.log(query);

    return { code: 200 };
  }

  @Post('query')
  postQuery(@Body('name') body: any, @Headers() header: any) {
    console.log(header);

    return { code: 200 };
  }

  @Get('getCode')
  getCode(@Req() req, @Res() res, @Session() session) {
    const Captcha = svgCaptcha.create({
      size: 3, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });

    session.code = Captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(Captcha.data);

    return { Captcha };
  }

  @Post('login')
  checkCode(@Body('code') code: string, @Session() session) {
    return {
      code: 200,
      msg:
        code.toLocaleLowerCase() === session.code.toLocaleLowerCase()
          ? '验证码正确'
          : '验证码错误',
    };
  }
}
