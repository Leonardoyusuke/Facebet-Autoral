import { follow, getFollows, unfollow } from '@/controllers/follow-controllers';
import { authentication } from '@/middlewares/authentication-middleware';
import { Router } from 'express'; 


const followRouter = Router();

followRouter
.all('/*',authentication)
.post('/',getFollows)
.delete('/:id',unfollow)
.get('/:id',follow)



export {followRouter} 
