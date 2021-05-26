import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
    BaseEntity, JoinTable
  } from 'typeorm';

import {Planeta} from "./Planeta";
import { User } from './User';

 @Entity()
  export class Planeta_Favorito extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Planeta, planeta => planeta.planetas_favoritos)
    planeta: Planeta;
    
    @ManyToOne(() => User, user => user.planetas_favoritos)
    user: User;

    
  }