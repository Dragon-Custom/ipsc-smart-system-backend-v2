import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShootersService } from './shooters.service';
import { CreateShooterDto } from './dto/create-shooter.dto';
import { UpdateShooterDto } from './dto/update-shooter.dto';

@Controller('shooters')
export class ShootersController {
  constructor(private readonly shootersService: ShootersService) {}

  @Post()
  create(@Body() createShooterDto: CreateShooterDto) {
    return this.shootersService.create(createShooterDto);
  }

  @Get()
  findAll() {
    return this.shootersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shootersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShooterDto: UpdateShooterDto) {
    return this.shootersService.update(+id, updateShooterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shootersService.remove(+id);
  }
}
