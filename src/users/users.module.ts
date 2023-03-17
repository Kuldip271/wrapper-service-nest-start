import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TasksModule } from 'src/tasks/tasks.module';
import { env } from 'process';
import { RedisModule, RedisService } from 'nestjs-redis';
import { HttpModule } from '@nestjs/axios';



@Module({
  imports:[PassportModule,TasksModule,JwtModule.register({
    secret:'helloworld',
    signOptions: { expiresIn: '6000s' }
  }),
  // RedisModule.register({
  //   host: 'localhost',
  //   port: 6379,
    
  // })
  

HttpModule],
  providers: [UsersResolver, UsersService,PrismaService,JwtStrategy]
})
export class UsersModule {}
