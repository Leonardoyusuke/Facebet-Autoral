import prisma from "@/config/database";


async function insertBet(gameId:number,userId:number,coins:number,odds:number,win:boolean) {
    return prisma.bet.create({
        data:{
            gameId,
            userId,
            coins,
            odds,
            win
        }
    })
}

async function updateCoins(userId:number,increase:number,win:boolean) {
    if(win==true){
        return prisma.users.update({
        where:{
            id:userId
        },
        data:{
            coins:{
                increment:increase
            }
        }

    })
    }else{
        return prisma.users.update({
            where:{
                id:userId
            },
            data:{
                coins:{
                    decrement:increase
                }
            }
        })
    }

    
}


const betRepository = {
    insertBet,
    updateCoins
}

export default betRepository