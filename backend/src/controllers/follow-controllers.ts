import followService from '@/services/follow-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getFollows(req:Request,res:Response){
    const profileId = parseInt(req.body.profileId, 10)
    const {userId} = res.locals;
    try {
        const followers = await followService.getFollowers(profileId,userId)
        res.status(httpStatus.OK).send(followers)
    } catch (error) {
        console.log(error)
    }
}

export async function unfollow(req:Request,res:Response) {
    const profileId = parseInt(req.params.id,10)
    const {userId} = res.locals;
    try {
        const unfollow = await followService.unfollow(profileId,userId)
        res.status(httpStatus.OK).send(unfollow)
    } catch (error) {
        console.log(error)
    }
}

export async function follow(req:Request,res:Response) {
    const profileId = parseInt(req.params.id,10)
    const {userId} = res.locals;
    try {
        const follow = await followService.follow(profileId,userId)
        res.status(httpStatus.OK).send(follow)
    } catch (error) {
        console.log(error)
    }
    
}