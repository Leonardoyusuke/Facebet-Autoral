import { feed, postFeed } from '@/controllers/feed-controllers';
import { authentication } from '@/middlewares/authentication-middleware';
import { Router } from 'express'; 


const feedRouter = Router();

feedRouter
.all('/*',authentication)
.get('/',feed)
.post('/',postFeed)



export {feedRouter} 
