
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
// import { createUser } from './actions';
// import { deleteUser } from './actions';
import * as actions from './actions';



const router = Router();

// signup route, creates a new user in the DB
router.post('/login', safe(actions.login));
router.post('/user', safe(actions.createUser));
router.post('/planetas', safe(actions.createPlaneta));
router.post('/personajes', safe(actions.createPersonaje));

router.get('/planetas', safe(actions.getPlanetas));
router.get('/personajes', safe(actions.getPersonajes));

router.delete('/user/:id', safe(actions.deleteUser));

export default router;
