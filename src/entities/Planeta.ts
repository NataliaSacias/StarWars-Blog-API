import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  import {Planeta_Favorito} from "./Planeta_Favorito"

  @Entity()
  export class Planeta extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    photo: string;
  
    @Column()
    diameter: number;
  
    @Column()
    rotation_period: number;
  
    @Column()
    orbital_period: number;
    
    @Column()
    gravity: string;
    
    @Column()
    population: number;
    
    @Column()
    climate: string;
    
    @Column()
    terrain: string;
    
    @Column()
    surface_water: number;
    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];
    
     @OneToMany(() => Planeta_Favorito, planeta_favorito => planeta_favorito.planeta)
    planetas_favoritos: Planeta_Favorito[];
  }