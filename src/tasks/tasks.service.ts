import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
    constructor(private prisma:PrismaService){}

  create(createTaskInput: CreateTaskInput,id:number) {
    return this.prisma.task.create({
      data:{
        name:createTaskInput.name,
        userId:id
      }
    });
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        name: updateTaskInput.name,
      },
    })
  }


  remove(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      }
    });
  }


  findAll(id:number) {
    return this.prisma.task.findMany({
      where:{
        userId:id,
      },
      include:{
        user:true
      }
    })
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where:{
        id,
      }
    })
  }

  

  
}
