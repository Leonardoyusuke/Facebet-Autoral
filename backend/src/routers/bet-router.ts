import { insertBet } from '@/controllers/beet-controllers';
import { authentication } from '@/middlewares/authentication-middleware';
import { Router } from 'express'; 


const betRouter = Router();

betRouter
.all('/*',authentication)
.get('/',)
.post('/',insertBet)



export {betRouter} 
