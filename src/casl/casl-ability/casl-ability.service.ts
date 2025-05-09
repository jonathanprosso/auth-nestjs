import { Injectable, Scope } from '@nestjs/common';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma'
import { Post, Roles, User } from '@prisma/client';

export type PermActions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type PermissionResource = Subjects<{User: User; Post: Post}> | 'all';

export type AppAbility = PureAbility<[PermActions, PermissionResource], PrismaQuery>;

export type DefinePermissions = (
    user: User,
    builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissionMap: Record<Roles, DefinePermissions> = {
    ADMIN(user, {can}) {
        can('manage', 'all');
    },
    EDITOR(user, {can}) {
        can('create', 'Post');
        can('read', 'Post');
        can('update', 'Post');
    },
    WRITER(user, {can}) {
        can('create', 'Post');
        can('read', 'Post', { authorId: user.id }); // Posso apenas ver meus posts 
        can('update', 'Post', { authorId: user.id }); // posso apenas atualziar meus posts
    },
    READER(user, {can}) {
        can('read', 'Post', { published: true });
    },
}

@Injectable({scope: Scope.REQUEST})
export class CaslAbilityService {
    ability: AppAbility;

    createForUser(user: User){
        const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
        rolePermissionMap[user.role](user, builder);

        this.ability = builder.build();
        return this.ability ;
    }
}
