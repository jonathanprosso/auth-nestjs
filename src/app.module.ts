import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, PostModule, CaslModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
