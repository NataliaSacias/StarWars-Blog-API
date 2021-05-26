import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  import {Planetas_Favoritos} from "./Planetas_Favoritos"

  @Entity()
  export class Planetas extends BaseEntity{
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
    
     @OneToMany(() => Planetas_Favoritos, planetas_favoritos => planetas_favoritos.planetas)
    planetas_favoritos: Planetas_Favoritos[];
  }