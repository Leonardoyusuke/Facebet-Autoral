import prisma from "@/config/database";


async function followers(profileId:number) {
    return prisma.follows.findMany({
        where:{
            followingId:profileId
        },
        select:{
            followerId:true
        }
    })
}

async function unfollow(profileId:number, userId:number) {
    return prisma.follows.deleteMany({
        where: {
            followingId: profileId,
            followerId: userId
        }
    });
}
async function follow(profileId: number, userId: number) {
    return prisma.follows.create({
      data: {
        followerId: userId,
        followingId: profileId,
      },
    });
  }
  



const followRepositories = {
    followers,
    unfollow,
    follow
}

export default followRepositories