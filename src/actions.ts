import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Planeta } from './entities/Planeta'
import { Planeta_Favorito } from './entities/Planeta_Favorito'
import { Personaje } from './entities/Personaje'
import { Exception } from './utils'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(User)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(User).create(req.body);  //Creo un usuario
	const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const createPlaneta = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.name) throw new Exception("Please provide a first_name")

	const userRepo = getRepository(Planeta)
	const planeta = await userRepo.findOne({ where: {name: req.body.name }})
	if(planeta) throw new Exception("Ya exite un planeta con ese nombre")

	const newPlaneta = getRepository(Planeta).create(req.body); 
	const results = await getRepository(Planeta).save(newPlaneta); //Grabo el nuevo planeta
	return res.json(results);
}

export const createPlanetaFavorito = async (req: Request, res:Response): Promise<Response> =>{

    if(!req.body.planeta) throw new Exception("ingrese el id de un planeta")
    if(!req.body.user) throw new Exception("ingrese el id de un usuario")

    const userRepo = getRepository(Planeta_Favorito)
	const planeta_favorito = await userRepo.findOne({ where: {planeta: req.body.planeta}&&{user:req.body.user}})
	if(planeta_favorito) throw new Exception("Ya exite un planeta favorito con ese usuario")

	const newPlaneta_Favorito = getRepository(Planeta_Favorito).create(req.body); 
	const results = await getRepository(Planeta_Favorito).save(newPlaneta_Favorito); //Grabo el nuevo planeta
	return res.json(results);
}

export const createPersonaje = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.name) throw new Exception("Please provide a name")

	const personajeRepo = getRepository(Personaje)
	// fetch for any user with this email
	const personaje = await personajeRepo.findOne({ where: {name: req.body.name }})
	if(personaje) throw new Exception("ya existe un personaje con ese nombre")

	const newpersonaje = getRepository(Personaje).create(req.body);  //Creo un personaje
	const results = await getRepository(Personaje).save(newpersonaje); //Grabo el nuevo personaje
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(User).find();
		return res.json(users);
}

export const getPlanetas = async (req: Request, res: Response): Promise<Response> =>{
		const planetas = await getRepository(Planeta).find();
		return res.json(planetas);
}

export const getPersonajes = async (req: Request, res: Response): Promise<Response> =>{
		const personajes = await getRepository(Personaje).find();
		return res.json(personajes);
}

// ELIMINAR UN USUARIO

export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(User).delete(req.params.id);
    return res.json(users);
}