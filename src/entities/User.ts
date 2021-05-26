import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';
import {Planeta_Favorito} from "./Planeta_Favorito"
import {Personaje_Favorito} from "./Personaje_Favorito"
@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  // @ManyToMany(() => Planet)
  // @JoinTable()
  // planets: Planet[];
  @OneToMany(() => Planeta_Favorito, planeta_favorito => planeta_favorito.user)
  planetas_favoritos: Planeta_Favorito[];
   
  @OneToMany(()=> Personaje_Favorito, personaje_favorito => personaje_favorito.user)
  personajes_favoritos: Personaje_Favorito[];
}