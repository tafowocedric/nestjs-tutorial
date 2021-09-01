import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { SessionAuthenticatedGuard } from './auth/session-authenticated.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return { msg: 'Logged In!' };
    }

    // get /protected
    @UseGuards(SessionAuthenticatedGuard)
    @Get('protected')
    getHello(): string {
        return this.appService.getHello();
    }
}
