import { createUser, cupom, freeCoins, getCoins, getUserProfile, login, searchUsers } from '@/controllers/users-controllers';
import { validateBody } from '@/middlewares/validation-middleware';
import { createSignInSchema, createSignupSchema } from '@/schemas/users-schemas';
import { authentication } from '@/middlewares/authentication-middleware';

import { Router } from 'express'; 


const usersRouter = Router();

usersRouter
.post('/signup',validateBody(createSignupSchema) ,createUser )
.post('/signin',validateBody(createSignInSchema),login)
.post('/cupom',authentication,cupom)
.get('/coins',authentication,getCoins)
.get('/freecoins',authentication,freeCoins)
.post('/search',searchUsers)
.post('/profile',authentication,getUserProfile)



export {usersRouter} 
