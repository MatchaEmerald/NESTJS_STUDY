import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { Role } from './role/role.decorator';
import { RoleGuard } from './role/role.guard';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('guard')
@ApiTags('守卫')
@ApiBearerAuth()
// @UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @ApiOperation({ summary: 'get接口', description: 'get接口描述' })
  @ApiQuery({ name: 'page', description: '分页信息', required: true })
  @ApiResponse({ status: 403, description: '小黑子' })
  @SetMetadata('roles', ['admin'])
  @Role('admin')
  findAll() {
    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'id', required: true })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
