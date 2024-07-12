import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
    constructor( @InjectRepository(User) private Repo:Repository<User>){}
    create(email:string , password:string){
        const user=this.Repo.create({email,password});
        return this.Repo.save(user);
    }
    
    async findOne(id: number): Promise<User> {
        const user = await this.Repo.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        return user;
      }
      async find(email:string): Promise<User[]>{
      return this.Repo.find({ where: { email } })
    }

    async update(id: number, attrs: Partial<User>): Promise<User> {
        const user = await this.findOne(id);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.Repo.save(user);
      }
    async remove(id:number){
        const user=await this.findOne(id)
        if(!user){
            throw new NotFoundException('User not found')
        }
        
        return this.Repo.remove(user)
    }
}
