import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
const  scrypt=promisify(_scrypt)
@Injectable()
export class AuthService{
    constructor (private userservice:UsersService){}
   async signup(email:string, password:string){
    const users= await this.userservice.find(email)
    if(users.length){
        throw new BadRequestException('Email in Use')
    }
    const salt=randomBytes(8).toString('hex')
    const hash= (await scrypt(password, salt, 32)) as Buffer
    const result=salt+'.'+hash.toString('hex')
    const user=await this.userservice.create(email,result)
    return user;

    }
   async signin(email:string, password:string){
        const [user]=await this.userservice.find(email)
        if(!user){
            throw new NotFoundException('User not found')
        }
        const [salt, storedhash]=user.password.split('.')
        const hash= (await scrypt(password, salt, 32)) as Buffer
        if(storedhash!==hash.toString('hex')){
            throw new BadRequestException('Bad Password')
            
        }
        return user
           

    }
}