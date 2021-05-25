import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  // import {Planet} from "./Planet"
  @Entity()
  export class User extends BaseEntity{
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
    gravity: number;
    
    @Column()
    pupulation: number;
    
    @Column()
    climate: string;
    
    @Column()
    terrain: string;
    
    @Column()
    surface_water: number;
    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];
    
  }