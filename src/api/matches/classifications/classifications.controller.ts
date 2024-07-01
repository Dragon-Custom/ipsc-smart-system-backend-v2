import { Controller } from '@nestjs/common';
import { ClassificationsService } from './classifications.service';

@Controller('classifications')
export class ClassificationsController {
  constructor(private readonly classificationsService: ClassificationsService) {}
}
