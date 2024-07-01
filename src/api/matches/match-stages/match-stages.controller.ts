import { Controller } from '@nestjs/common';
import { MatchStagesService } from './match-stages.service';

@Controller('match-stages')
export class MatchStagesController {
  constructor(private readonly matchStagesService: MatchStagesService) {}
}
