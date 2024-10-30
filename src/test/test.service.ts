import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly test: Repository<Test>,
  ) { }

  create(createTestDto: CreateTestDto) {
    const data = new Test();
    data.name = createTestDto.name;
    data.desc = createTestDto.desc;

    return this.test.save(data);
  }

  async findAll(query: { keyWord: string, page: number, pageSize: number }) {

    const data = await this.test.find({
      take: query.pageSize,
      skip: (query.page - 1) * query.pageSize,
      where: { name: Like(`%${query.keyWord}%`) },
      order: { id: 'DESC' }
    });

    const total = await this.test.count({ where: { name: Like(`%${query.keyWord}%`) }, })

    return { data, total }
  }


  update(id: string, updateTestDto: UpdateTestDto) {
    return this.test.update(id, updateTestDto);

  }

  remove(id: string) {
    return this.test.delete(id);
  }
}
