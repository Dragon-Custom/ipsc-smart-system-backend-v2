import { Controller } from '@nestjs/common';
import { ScoreProceduralPenaltiesService } from './score-procedural-penalties.service';

@Controller('score-procedural-penalties')
export class ScoreProceduralPenaltiesController {
  constructor(private readonly scoreProceduralPenaltiesService: ScoreProceduralPenaltiesService) {}
}
