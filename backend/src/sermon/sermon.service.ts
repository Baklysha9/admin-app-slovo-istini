import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSermonDto } from './dto/create-sermon.dto';
import { UpdateSermonDto } from './dto/update-sermon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SermonEntity } from './entities/sermon.entity';
import { Repository } from 'typeorm';
import {
  AllSermonsResponse,
  StatusSermonResponse,
  UpdateSermon,
} from './interfaces/interface';

@Injectable()
export class SermonService {
  constructor(
    @InjectRepository(SermonEntity)
    private sermonRepository: Repository<SermonEntity>,
  ) {}

  async create(createSermonDto: CreateSermonDto): Promise<SermonEntity> {
    try {
      return await this.sermonRepository.save(createSermonDto);
    } catch (error) {
      throw new HttpException(
        'from:createSermon ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<AllSermonsResponse> {
    try {
      const [sermons, count] = await this.sermonRepository.findAndCount();
      return {
        sermons,
        count,
      };
    } catch (error) {
      throw new HttpException(
        'from:findAllSermonItems ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<SermonEntity> {
    try {
      return await this.sermonRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        'from:findOneSermonItem ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    updateSermonDto: UpdateSermonDto,
  ): Promise<StatusSermonResponse> {
    try {
      const updateFields: UpdateSermon = {};

      if (updateSermonDto.title) {
        updateFields.title = updateSermonDto.title;
      }
      if (updateSermonDto.description) {
        updateFields.description = updateSermonDto.description;
      }
      await this.sermonRepository.update(id, updateFields);
      return { status: 'success' };
    } catch (error) {
      throw new HttpException(
        'from:update ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<StatusSermonResponse> {
    try {
      await this.sermonRepository.delete(id);
      return { status: 'success' };
    } catch (error) {
      throw new HttpException(
        'from:remove ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
