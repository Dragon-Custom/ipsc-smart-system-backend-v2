import { Module } from '@nestjs/common';
import { ClassificationsService } from './classifications.service';
import { ClassificationsController } from './classifications.controller';

@Module({
  controllers: [ClassificationsController],
  providers: [ClassificationsService],
})
export class ClassificationsModule {}
