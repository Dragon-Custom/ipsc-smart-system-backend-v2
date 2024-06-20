import { Injectable } from '@nestjs/common';
import { CreateShooterDto } from './dto/create-shooter.dto';
import { UpdateShooterDto } from './dto/update-shooter.dto';

@Injectable()
export class ShootersService {
  create(createShooterDto: CreateShooterDto) {
    return 'This action adds a new shooter';
  }

  findAll() {
    return `This action returns all shooters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shooter`;
  }

  update(id: number, updateShooterDto: UpdateShooterDto) {
    return `This action updates a #${id} shooter`;
  }

  remove(id: number) {
    return `This action removes a #${id} shooter`;
  }
}
