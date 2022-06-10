import { Controller, Post } from '@nestjs/common';
import { CreateMemberAnalysis } from 'src/domain/use-cases';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly createMemberAnalysis: CreateMemberAnalysis) {}

  @Post()
  async create() {
    this.createMemberAnalysis.create({});
  }
}
