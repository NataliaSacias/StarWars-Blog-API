import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
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
    hair_color: string;
    
    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    homeworld: string;

    @OneToMany(() => Personajes_Favoritos, personajes_favoritos => personajes_favoritos.id)
    // @JoinTable()
    // planets: Planet[];
    
  }