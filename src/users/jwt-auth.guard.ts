import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(){
        super();
    }

   getRequest(context:ExecutionContext){
    // const ctx = GqlExecutionContext.create(context)
    // const request = ctx.getContext()
    // request.body = ctx.getArgs().loginUserInput
    // return request
    const ctx = GqlExecutionContext.create(context)
    //console.log(ctx.getContext())
  //  console.log('Bearer',ctx.getContext().req?.user)
    return ctx.getContext().req
  
   }

}