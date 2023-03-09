import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { Pet } from './common/entity/pet.entity';
import { User } from './users/entity/user.entity';
import { Post } from './posts/entity/post.entity';

// @Module({
//   imports: [CatsModule, DogsModule, UsersModule, PostsModule],
//   providers: [AppService],
// })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootroot',
      database: 'mascotapp',
      entities: [Pet, User, Post],
      synchronize: true,
    }),
    CatsModule,
    DogsModule,
    UsersModule,
    PostsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
