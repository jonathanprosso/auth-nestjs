import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequiredRoles } from 'src/auth/required-roles.decorator';
import { Roles } from '@prisma/client';
import { RoleGuard } from 'src/auth/role/role.guard';
import { log } from 'console';

@UseGuards(AuthGuard)
// @UseGuards(AuthGuard, RoleGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @RequiredRoles(Roles.WRITER, Roles.EDITOR)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return this.postService.create({
      ...createPostDto,
      authorId: req.user!.id,
    });
  }

  @RequiredRoles(Roles.WRITER, Roles.EDITOR, Roles.READER)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @RequiredRoles(Roles.WRITER, Roles.EDITOR, Roles.READER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOne(id); 
    if(!post){
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  @RequiredRoles(Roles.WRITER, Roles.EDITOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @RequiredRoles(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
