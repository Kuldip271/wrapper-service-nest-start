import { HttpService } from '@nestjs/axios';
import { Controller, Get, Post, Redirect, Req } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private token : any;

  constructor(private readonly appService: AppService, private readonly redisService : RedisService,private readonly httpService : HttpService) {}

  @Get('ji')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async gettoken(@Req() req ){
     
    if(req.body.token){

      console.log(req.body.token);

      this.token = req.body.token

      const redisClient = this.redisService.getClient();

      const userKey = req.body.token.emailAddress ;
    
      const userExists = await redisClient.exists(userKey);
    
      if(userExists){

        await redisClient.hmset(userKey, {

              access_token : req.body.token.accessToken
        })
          
        // try{
      
        //   const url = 'https://f9eb-27-109-3-34.in.ngrok.io';
        //   const value = this.token;

        //   const response =  await this.httpService.post(url, {value});

        //     await firstValueFrom(response);
        //     // console.log(res1);
        //    }
      
        //    catch(error)
        //    {
        //         console.log(error);
        //    } 
        // console.log('user found in redis')
        
      }
      else{

         console.log('User not found in redis')
      }

    }
    else{
      console.log(req.body.msg)
    }
  }

   
 



}
