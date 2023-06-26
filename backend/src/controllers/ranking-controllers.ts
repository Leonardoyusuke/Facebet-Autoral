import rankingService from '@/services/ranking-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getGeralRanking(req: Request, res: Response) {
    try {
        const ranking = await rankingService.getGeralRanking()
        return res.status(200).send(ranking)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
    }

}
export async function getFriendRanking(req: Request, res: Response) {
    const {userId} = res.locals;
    try {
        const ranking = await rankingService.getFriendRanking(userId)
        return res.status(httpStatus.OK).send(ranking)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
    }

}

export async function getRankingPage(req:Request,res:Response) {
    const {userId} = res.locals
    try {
        const ranking = await rankingService.getRankingPage(userId)
        return res.status(httpStatus.OK).send(ranking)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
    }    
}

