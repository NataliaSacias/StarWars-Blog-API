import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
    BaseEntity, JoinTable
  } from 'typeorm';

import {Planetas} from "./Planetas";

 @Entity()
  export class Planetas_Favoritos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Planetas, planetas => planetas.planetas_favoritos)
    planetas: Planetas;

  }