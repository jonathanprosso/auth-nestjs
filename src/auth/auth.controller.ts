import { Body, Controller, Post } from '@nestjs/common';
import { loginDto } from './login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService){}

    @Post('login')
    login(@Body() loginDto: loginDto){
        return this.authService.login(loginDto);
    }
}
