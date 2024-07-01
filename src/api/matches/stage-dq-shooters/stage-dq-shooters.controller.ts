import { Controller } from '@nestjs/common';
import { StageDqShootersService } from './stage-dq-shooters.service';

@Controller('stage-dq-shooters')
export class StageDqShootersController {
  constructor(private readonly stageDqShootersService: StageDqShootersService) {}
}
