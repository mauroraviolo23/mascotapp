import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostDto } from './dto/posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('/all')
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postService.findById(id);
  }

  @Post()
  create(@Body() createPostDto: PostDto) {
    return this.postService.insert(createPostDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.delete(id);
  }
}
