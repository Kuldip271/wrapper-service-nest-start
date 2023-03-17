import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Response } from './response';
import { SignupUserInput } from './dto/signup-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { JwtAuthGuard } from './jwt-auth.guard';
import {  Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskInput } from 'src/tasks/dto/create-task.input';
import { ResponseTask } from 'src/tasks/response-task';
import { UpdateTaskInput } from 'src/tasks/dto/update-task.input';
import { RedisService } from 'nestjs-redis';
import  { HttpService } from '@nestjs/axios';
// import axios from 'axios';
// import * as WebSocket from 'ws';
// import { RedisService } from 'redis/redis.service';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import https from 'https'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,private taskService:TasksService,private readonly redisService: RedisService, private readonly httpService: HttpService) {}

  @Mutation(()=> Response)
  async signup(@Args('signupUserInput') signupUserInput:SignupUserInput){
    return this.usersService.signup(signupUserInput)
    
  }

  @Mutation(()=> Response)
  async login(@Args('loginUserInput') loginUserInput:LoginUserInput){

  // const redisClient = this.redisService.getClient();

  // const userKey = loginUserInput.email ;

  // const userExists = await redisClient.exists(userKey);

  //  console.log(userExists)

  // if (!userExists) {
  //   console.time('dbtimer')
   
  //   const user = await this.usersService.login(loginUserInput);

  //   console.timeEnd('dbtimer')


  //   // Store the user's data in Redis
  //   await redisClient.hmset(userKey, {
  //     username: user.user.username,
  //     age: user.user.age,
  //     id : user.user.id,
  //     access_token : user.access_token

  //   });
  //   console.log(userKey)

  //   return user;
  // }
  // else{
  //   // console.log( userExists);
  //   console.time('redistimer')

  //   const userfromredis = await redisClient.hmget(userKey,'username','age', 'id', 'access_token');

  //   console.timeEnd('redistimer')

  //    console.log(userfromredis)


  //    const user = {
        
  //      username : userfromredis[0],
  //      email : userKey,
  //      age : userfromredis[1],
  //     //  id : userfromredis[2],
  //      access_token : userfromredis[3] 
  //    }
     
  //   return {user};

  //   // return {userfromredis};
  // }

//////////////////////////////////////////////////////////////////
const redisClient = this.redisService.getClient();
    const userKey = loginUserInput.email;
  //  console.log(userKey)
    await redisClient.hmset(userKey, {
      email : loginUserInput.email
      
    })
     try{

    // console.log(response)

    const url = 'https://d6bb-27-109-3-34.in.ngrok.io/hello';
    const response =  await this.httpService.post(url, {data : loginUserInput.email});
      await firstValueFrom(response);
    // console.log(res1);
     }

     catch(error)
     {
          console.log(error);
     } 
     
     

}
  


  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponseTask)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput, @Context() context) {
    // console.log({context})
    return this.taskService.create(createTaskInput,context?.req?.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponseTask)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponseTask)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Response)
  removeUser(@Context() context) {
    
    return this.usersService.remove(context?.req?.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(()=>[ResponseTask])
  findAllTask(@Context() context) {
    return this.taskService.findAll(context?.req?.user?.id);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => ResponseTask)
  findOneTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  
}
