import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { HttpModule } from '@nestjs/axios';
// import { RedisModule } from 'nestjs-redis';
// import { RedisCoreModule } from './redis.module';



@Module({
  imports: [UsersModule,GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(),'src/schema.gql'),
    sortSchema:true
  }), TasksModule,
 
  ConfigModule.forRoot(),
  RedisModule.register({
   url : 'redis://localhost:6379'
}),
  HttpModule

  ],
  controllers: [AppController],
  providers: [AppService], 
  exports : [RedisModule,HttpModule]
})
export class AppModule {}
