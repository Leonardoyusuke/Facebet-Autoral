import feedService from '@/services/feed-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function feed(req: Request, res: Response) {
    const {userId} = res.locals;
    try {
        const posts = await feedService.getPosts(userId)
        res.status(httpStatus.OK).send(posts)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
    }
}
export async function postFeed(req: Request, res: Response) {
    const description = req.body
    const userId = req.body
    try {
        const post = await feedService.postFeed(description,userId)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)

    }
    
}
