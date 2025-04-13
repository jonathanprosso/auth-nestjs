import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private prismaService: PrismaService
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if(!token){
      throw new UnauthorizedException('No token provided');
    }

    try{
      const payload = await this.jwtService.verify(token, {algorithms: ['HS256']});
      console.log('Payload:', payload); 

      // pegar o usuário e colocar na request
      const user = await  this.prismaService.user.findUnique({
        where: {id: payload.sub },
      })

      if(!user){
        throw new UnauthorizedException('User Not Found');
      }
      request.user = user;

      return true;
    }catch(e){
      console.error(e);
      throw new UnauthorizedException('Invalid Token', {cause:e})
    }

    return true;
  }
}
