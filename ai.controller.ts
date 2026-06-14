import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generate(@Body('prompt') prompt: string) {
    const response = await this.aiService.generateResponse(prompt);
    return { response };
  }
}
