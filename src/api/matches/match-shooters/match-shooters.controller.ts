import { Controller } from '@nestjs/common';
import { MatchShootersService } from './match-shooters.service';

@Controller('match-shooters')
export class MatchShootersController {
  constructor(private readonly matchShootersService: MatchShootersService) {}
}
