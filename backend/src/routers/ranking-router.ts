import { getFriendRanking, getGeralRanking, getRankingPage } from '@/controllers/ranking-controllers';
import { authentication } from '@/middlewares/authentication-middleware';
import { Router } from 'express'; 


const rankingRouter = Router();

rankingRouter
.all('/*',authentication)
.get('/',getGeralRanking)
.get('/friend',getFriendRanking)
.get('/page',getRankingPage)



export {rankingRouter} 
