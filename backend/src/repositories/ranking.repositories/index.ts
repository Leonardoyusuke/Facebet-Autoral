import prisma from "@/config/database";

export async function getGeralRanking() {
    return prisma.users.findMany({
        orderBy:{
            coins:'desc'
        },
        take:5
    })
}
export async function getFriendRanking(userId: number) {
    const follows = prisma.follows.findMany({
        where: {
            followerId: userId
        }
    });

    const followerIds = (await follows).map(follow => follow.followingId);
    followerIds.push(userId);


    return prisma.users.findMany({
        where: {
            id: {
                in: followerIds
            }
        },
        orderBy: {
            coins: 'desc'
        },
        take: 5
    });
}


export async function getRankingPage() {
    return prisma.users.findMany({
        orderBy:{
            coins:'desc'
        },
        take:10
    })
}
export async function getNewRankingPage(userId:number) {
       return prisma.users.findFirst({
        where:{
            id:userId
        }
    })

}

const rankingRepositories = {
    getGeralRanking,
    getFriendRanking,
    getRankingPage,
    getNewRankingPage
}

export default rankingRepositories