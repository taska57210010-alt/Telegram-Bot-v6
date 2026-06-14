import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  // Placeholder method to call an AI model
  async generateResponse(prompt: string): Promise<string> {
    // In real implementation integrate with OpenAI/Anthropic SDK
    return `AI response for: ${prompt}`;
  }
}
