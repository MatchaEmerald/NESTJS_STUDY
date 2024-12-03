import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { Tags } from './entities/tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly test: Repository<Test>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}

  async create(createTestDto: CreateTestDto) {
    const data = new Test();
    data.name = createTestDto.name;
    data.desc = createTestDto.desc;

    let createData = await this.test.save(data);
    let saveData = await this.addTags(createData.id, createTestDto.tags);

    return saveData;
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.test.find({
      relations: ['tags'],
      take: query.pageSize,
      order: { id: 'DESC' },
      skip: (query.page - 1) * query.pageSize,
      where: { name: Like(`%${query.keyWord}%`) },
    });

    const total = await this.test.count({
      where: { name: Like(`%${query.keyWord}%`) },
    });

    return { data, total };
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    let { name, desc, tags } = updateTestDto;
    let saveData = await this.addTags(Number(id), tags);
    await this.test.update(id, { name, desc });
    return saveData;
  }

  /** 添加标签关联传入的id */
  async addTags(id: number, tagList: string[]) {
    const userInfo = await this.test.findOne({ where: { id: id } });
    console.log(userInfo, tagList);

    let list: Tags[] = [];
    for (let i = 0; i < tagList.length; i++) {
      const T = new Tags();
      T.name = tagList[i];

      await this.tags.save(T);
      list.push(T);
    }

    userInfo.tags = list;
    return this.test.save(userInfo);
  }

  remove(id: string) {
    return this.test.delete(id);
  }
}
