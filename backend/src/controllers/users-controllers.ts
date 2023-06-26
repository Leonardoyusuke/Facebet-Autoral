import { Request, Response } from 'express';
import usersService from '@/services/users-service';
import httpStatus from 'http-status';


export async function createUser(req: Request, res: Response) {
    const { username, email, password, pictureUrl } = req.body
    try {
        const token = await usersService.createUser(username, email, password, pictureUrl)
        return res.status(httpStatus.CREATED).json({
            token
        })
    } catch (error) {
        if (error.name === 'DuplicatedEmailError') {
            return res.status(httpStatus.CONFLICT).send(error);
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const login = await usersService.login(email, password)
        res.status(httpStatus.OK).send(login)
    } catch (error) {
        if(error.name =='CredencialsError' || error.message =='Email or Password wrong!') {
            return res.status(httpStatus.UNAUTHORIZED).send("unauthorized")
        } return res.status(httpStatus.BAD_REQUEST).send(error)
    }
}

export async function getCoins(req: Request, res: Response) {
    const { userId } = res.locals;
    try {
        const coins = await usersService.getCoins(userId)
        return res.status(httpStatus.OK).send(coins)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }

}

export async function searchUsers(req: Request, res: Response) {
    const { search } = req.body
    try {
        const results = await usersService.SearchUsers(search)
        return res.status(httpStatus.OK).send(results)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}

export async function freeCoins(req: Request, res: Response) {
    const { userId } = res.locals;

    try {
        const increment = await usersService.freeCoins(userId)
        return res.status(httpStatus.OK).send(increment)
    } catch (error) {
        if (error.name === 'needWait1DayError') {
            return res.status(httpStatus.UNAUTHORIZED).json("Preciso esperar 24Horas desde a ultima solicitação")
        }
        return res.status(httpStatus.BAD_REQUEST)
    }
}

export async function cupom(req: Request, res: Response) {
    const { userId } = res.locals;
    const codigo = req.body.cupom
    try {
        const increment = await usersService.cupom(userId, codigo)
        return res.status(httpStatus.OK).send(increment)
    } catch (error) {
        if (error.name === 'InvalidCupomError') {
            return res.status(httpStatus.UNAUTHORIZED).json("Cupom invalido ou expirado")
        }
        return res.status(httpStatus.BAD_REQUEST)
    }
}

export async function getUserProfile(req:Request,res:Response) {
    const profileId = parseInt(req.body.profileId, 10)

    try {
        const profile = await usersService.getUserProfile(profileId)
        res.status(httpStatus.OK).send(profile)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }

    
}