import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  import {Personaje_Favorito} from "./Personaje_Favorito"
  @Entity()
  export class Personaje extends BaseEntity{
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

    @OneToMany(() => Personaje_Favorito, personaje_favorito => personaje_favorito.personaje)
    personajes_favoritos: Personaje_Favorito[];
    
    // @JoinTable()
    // planets: Planet[];
    
  }