import prisma from "@/config/database"

async function getCoins(userId: number) {
    return prisma.users.findFirst({
        where: {
            id: userId
        }, select: {
            coins: true
        }
    })

}

async function findEmail(email: string) {
    return prisma.users.findFirst({
        where: { email }
    })
}

async function createUSer(username: string, email: string, hashedPassword: string, pictureUrl: string) {
    return prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
            pictureUrl
        }
    })
}

async function login(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email,
        }
    })
}

async function searchUsers(text: string) {
    return prisma.users.findMany({
        where: {
            username: {
                contains: text
            }
        },
        take: 4
    })
}
async function freeCoins(userId: number,dataAtual:Date) {
    return prisma.users.update({
        where: {
            id: userId 
        },
        data: {
            coins:  { 
                increment: 500 
            },
            dailyCoins:dataAtual

        }
    })
}
async function checkTimeForFreeCoins(userId: number) {
    return prisma.users.findFirst({
        where: { 
            id: userId 
        },
        select:
        {
            dailyCoins: true
        }
    })
}
async function cupom(userId:number) {
    return prisma.users.update({
        where:{
            id:userId
        },
        data:{
            coins: {
                increment:2000
            }
        }
    })
}

async function getUserProfile(profileId:number) {
    return prisma.users.findFirst({
        where:{
            id:profileId
        },
        select:{
            username:true,
            bet:{
                orderBy:{
                    id:'desc'
                }
            },
            pictureUrl:true,
            coins:true,
            follows_follows_followingIdTousers:true
        }
    })
}

const userRepository = {
    createUSer,
    findEmail,
    login,
    getCoins,
    searchUsers,
    freeCoins,
    checkTimeForFreeCoins,
    cupom,
    getUserProfile
}

export default userRepository