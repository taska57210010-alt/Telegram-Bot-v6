import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Example endpoint for Telegram login widget verification
  @Get('telegram')
  async telegramLogin(@Query('hash') hash: string, @Query('id') id: string) {
    // In a real implementation you would verify the hash using the Telegram bot token
    // and retrieve the user. Here we just return a placeholder response.
    const user = await this.authService.verifyTelegramLogin({ hash, id });
    return { success: true, user };
  }
}
