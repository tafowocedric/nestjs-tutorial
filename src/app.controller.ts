import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthenticatedGuard } from './auth/jwt-authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return this.authService.login(req.user); // TODO: return JWT access token
    }

    // get /protected
    @UseGuards(JwtAuthenticatedGuard)
    @Get('protected')
    getHello(@Request() req): string {
        // TODO: require a Bearer token, validate token
        return req.user;
    }
}
