import { Controller } from '@nestjs/common';
import { MatchStaffsService } from './match-staffs.service';

@Controller('match-staffs')
export class MatchStaffsController {
  constructor(private readonly matchStaffsService: MatchStaffsService) {}
}
