import betService from '@/services/bet-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { boolean } from 'joi';

export async function insertBet(req:Request,res:Response) {
    const {userId} = res.locals;
    const {gameId,coins,odds,win} = req.body
    
    try {
        const bet = await betService.postBet(gameId,userId,coins,odds,win)
        res.status(httpStatus.OK).send({coins:bet})
    } catch (error) {
        console.log(error)
        res.status(httpStatus.BAD_REQUEST)
    }
}