import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;
  @AfterInsert()
  logInsert(){
    console.log('user inserted by id ', this.id)
  }
  @AfterUpdate()
  logUpdate(){
    console.log('user updated by id ', this.id)
  }
  @AfterRemove()
  logRemove(){
    console.log('user removed by id ', this.id)
  }
}
