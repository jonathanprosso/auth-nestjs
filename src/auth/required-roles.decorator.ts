import { Roles } from ".prisma/client";
import { SetMetadata } from "@nestjs/common";

export const RequiredRoles = (...roles: Roles[]) => SetMetadata('roles', roles);