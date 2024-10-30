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

  findAll(query: { keyWord: string }) {
    return this.test.find({
      where: { name: Like(`%${query.keyWord}%`) },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: string, updateTestDto: UpdateTestDto) {
    return this.test.update(id, updateTestDto);

  }

  remove(id: string) {
    return this.test.delete(id);
  }
}
