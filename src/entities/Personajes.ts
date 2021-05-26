import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  // import {Planet} from "./Planet"
  @Entity()
  export class Personajes extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    photo: string;
  
    @Column()
    height: number;
  
    @Column()
    mass: number;
    
    @Column()
    hair: string;
    
    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    brith_year: string;

    @Column()
    gende: string;

    @Column()
    homeword: string;

    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];
    
  }