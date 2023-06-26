import betRepository from "@/repositories/beet-repositories";
import userRepository from "@/repositories/users-repositories";
import { coinsInsufficientError } from "./errors";

async function postBet(gameId:number,userId:number,coins:number,odds:number,win:boolean) {
    let increase = 0 
    const checkCoins = await userRepository.getCoins(userId)
    if(checkCoins.coins<coins) throw coinsInsufficientError()
    if(odds==2){
        increase = coins
    }else if(odds!=2 && win==true){
        increase = Math.floor(coins * odds)
    }else if(odds!=2 && win==false){
        increase = coins
    }
    const updateCoins = await betRepository.updateCoins(userId,increase,win)
    const bet = await betRepository.insertBet(gameId,userId,coins,odds,win)
    return updateCoins.coins 
    
}

const betService= {
    postBet
}
export default betService