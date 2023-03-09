import { Injectable, NotFoundException } from '@nestjs/common';
import { PostDto } from './dto/posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { Post } from './entity/post.entity';
import { UpdatePostDto } from './dto/update-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postsRepository.find();
  }

  findById(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  async insert(body: PostDto) {
    const post = this.postsRepository.create({
      id: uuidv4(),
      ...body,
    });
    await this.postsRepository.save(post);
    return post;
  }

  async update(id: string, body: UpdatePostDto) {
    const post = {
      id,
      ...body,
    };
    const updatedPost = await this.postsRepository.preload(post);
    if (updatedPost) return this.postsRepository.save(updatedPost);
    throw new NotFoundException(`No se encuentra el post con id: ${id}`);
  }

  async delete(id: string) {
    const post = await this.postsRepository.findOneBy({ id });
    if (post) return this.postsRepository.remove(post);
    throw new NotFoundException(`No se encuentra el post con id: ${id}`);
  }
}
