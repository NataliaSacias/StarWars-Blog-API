import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Planeta } from './entities/Planeta'
import { Planeta_Favorito } from './entities/Planeta_Favorito'
import { Personaje_Favorito } from './entities/Personaje_Favorito'
import { Personaje } from './entities/Personaje'
import { Exception } from './utils'
import jwt from "jsonwebtoken"

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
    console.log(req.userId);
    
    if(!req.body.planeta) throw new Exception("ingrese el id de un planeta")
    // if(!req.body.user) throw new Exception("ingrese el id de un usuario")

    const planetaFavoritoRepo = getRepository(Planeta_Favorito)
    const planeta_favorito = await planetaFavoritoRepo.findOne({ where: {planeta: req.body.planeta,user:req.userId}})
    
    const usuarioRepo = getRepository(User)
    const usuario = await usuarioRepo.findOne({ where: {id:req.userId}})
    const planetaRepo = getRepository(Planeta)
    const planeta = await planetaRepo.findOne({ where: {id:req.body.planeta}})

    if(planeta_favorito) throw new Exception("Ya exite un planeta con ese usuario en favoritos")
    if(!usuario) throw new Exception("No existe usuario");
    if(!planeta) throw new Exception("No existe usuario");
    const favorito = new Planeta_Favorito();
    favorito.user = usuario
    favorito.planeta = planeta

	const newPlaneta_Favorito = getRepository(Planeta_Favorito).create(favorito); 
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

export const createPersonajeFavorito = async (req: Request, res:Response): Promise<Response> =>{
    
    if(!req.body.personaje) throw new Exception("ingrese el id de un personaje")
    // if(!req.body.user) throw new Exception("ingrese el id de un usuario")

    const personajeFavoritoRepo = getRepository(Personaje_Favorito)
    const personaje_favorito = await personajeFavoritoRepo.findOne({ where: {personaje: req.body.personaje,user:req.userId}})
    
    const usuarioRepo = getRepository(User)
    const usuario = await usuarioRepo.findOne({ where: {id:req.userId}})
    const personajeRepo = getRepository(Personaje)
    const personaje = await personajeRepo.findOne({ where: {id:req.body.personaje}})

    if(personaje_favorito) throw new Exception("Ya exite un personaje con ese usuario en favoritos")
    if(!usuario) throw new Exception("No existe usuario");
    if(!personaje) throw new Exception("No existe pesonaje");
    const favorito = new Personaje_Favorito();
    favorito.user = usuario
    favorito.personaje = personaje

	const newPersonaje_Favorito = getRepository(Personaje_Favorito).create(favorito); 
	const results = await getRepository(Personaje_Favorito).save(newPersonaje_Favorito); //Grabo el nuevo personaje favorito
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(User).find();
		return res.json(users);
}

export const getUsersFavoritos = async (req: Request, res: Response): Promise<Response> =>{
        const usuarioRepo = getRepository(User)
        const usuario = await usuarioRepo.findOne({ where: {id:req.userId}})

        const planetasFavRepo = getRepository(Planeta_Favorito)
        const planetasFavoritos = await planetasFavRepo.find({ where: {user:usuario},relations: ['planeta']})

        const personajesFavRepo = getRepository(Personaje_Favorito)
        const personajesFavoritos = await personajesFavRepo.find({ where: {user:usuario},relations: ['personaje']})
		// const users = await getRepository(User).find();
		return res.json({planetasFavoritos,personajesFavoritos});
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
//buscar usuario y planeta o personajes, con esos 2 datos buscar el favorito

// TOKEN

export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(User)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string);
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}