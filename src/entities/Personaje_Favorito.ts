import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
    BaseEntity, JoinTable
  } from 'typeorm';

import {Personaje} from "./Personaje";
import { User } from './User';

 @Entity()
  export class Personaje_Favorito extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Personaje, personaje => personaje.personajes_favoritos)
    personaje: Personaje;
    
    @ManyToOne(() => User, user => user.personajes_favoritos)
    user: User;

    
  }