import { Injectable } from '@nestjs/common';
import { loginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService, 
        private prismaService: PrismaService
    ){}

    async login(loginDto: loginDto){
        const user = await this.prismaService.user.findUnique({
            where: { email: loginDto.email },
        });
        
        if(!user){
            throw new Error('Invalid Credentials');
        }

        const isPassWordValid = bcrypt.compareSync(
            loginDto.password,
            user.password
        )

        if (!isPassWordValid) {
            throw new Error('Invalid Credentials');
        }

        const token = this.jwtService.sign({ 
                name: user.name, 
                email: user.email,
                role: user.role,
                sub: user.id,
            });
        return { access_token: token };
    }
}
