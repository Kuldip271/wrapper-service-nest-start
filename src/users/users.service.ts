import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SignupUserInput } from './dto/signup-user.input';
import * as bcrypt from 'bcrypt'
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class UsersService {
   
  constructor(private prisma:PrismaService,private jwtService:JwtService,private taskService:TasksService){}

  async signup(signupUserInput:SignupUserInput){

      const user = await this.prisma.user.findUnique({
            where:{
              email:signupUserInput.email
            }
      })
      
      if(user)
      { 
        throw new Error("already exists")
      }

      
      const pass = await bcrypt.hash(signupUserInput.password,10)
      const data = await this.prisma.user.create({
                            data:{
                              username:signupUserInput.username,
                              email:signupUserInput.email,
                              password:pass,
                              age:signupUserInput.age
                            }

                       })
      const {password, ...result} = data
      const access_token = this.jwtService.sign({user: data})
      return {
        access_token,
        user: {...result}
      }
 }


 async login(loginUserInput:LoginUserInput) {
  
  try{
  
    const user = await this.prisma.user.findUnique({
      where:{
        email:loginUserInput.email
      }
     })
    
      if(!user){

            throw new BadRequestException("Please provide valid email or password")

      }
        const valid = await bcrypt.compare(loginUserInput.password,user?.password)
     
        if (user && valid)
         {
            const { password, ...result } = user;
            const access_token = this.jwtService.sign({user:user})
            return {
              access_token,     
              user:{...result}
            }
         
         }
    
  }
  catch(error)
  {
    console.log(error)
  }
  
}


  remove(id: number) {
    const tasks = this.prisma.task.deleteMany({
            where:{
              userId:id
            }
           })

      return this.prisma.user.delete({
        where: {
          id,
        }
    });
 
   }
}
