import { Roles } from '.prisma/client';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean  {

    const requiredRoles =
              this.reflector.get<Roles[]>('roles', context.getHandler()) ??
              this.reflector.get<Roles[]>('roles', context.getClass());

    console.log('requiredRoles', requiredRoles);


    if(!requiredRoles){
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const authUser = request.user;

    if (authUser!.role === Roles.ADMIN || requiredRoles.includes(authUser!.role)) {
      return true;
    }

    throw new ForbiddenException(
      `Acesso negado. Seu perfil "${authUser!.role}" não tem permissão.`,
    );
  }
}
