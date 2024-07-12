import { Body, Controller, Param, Post,Get,Query, Delete, Patch, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-User.dto';
import { UsersService } from './users.service';
import { updateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/AuthGuard';


@Controller('auth')
export class UsersController {
    constructor(
      private userService:UsersService,
      private authService:AuthService
    ){}
    
    @Post('/signup')
   async creatUser(@Body() body:CreateUserDto ,@Session() Session:any){
      const user=await this.authService.signup(body.email,body.password)
      Session.userId=user.id
      return user
    }
    @Post('/signin')
  async signin(@Body() body:CreateUserDto,@Session() Session:any ){
       const user=await this.authService.signin(body.email,body.password)
       Session.userId=user.id
       return user
    }
    @UseGuards(AuthGuard)
    @Get('/Whoami')
    Whoami(@Session() Session:any){
      return this.userService.findOne(Session.userId)
    }
    @Get('/signout')
  signout(@Session() Session:any){
     Session.userId=null
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.userService.findOne(parseInt(id))
    }
    @Get()
  findAllUser(@Query('email') email:string){
    return this.userService.find(email)
  }
  @Delete('/:id')
    delete(@Param('id') id:string){
        return this.userService.remove(parseInt(id))
    }
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateUserDto: Partial<updateUserDto>): Promise<updateUserDto> {
      return this.userService.update(id, updateUserDto);
    }

}
