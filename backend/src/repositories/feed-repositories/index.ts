import prisma from "@/config/database";

async function getPost(userid:number) {
    const follows = prisma.follows.findMany({
        where:{
            followerId:userid
        }
    })
    const followerIds = (await follows).map(follow => follow.followingId);
    return prisma.feed.findMany({
        where:{
            userId:{
                in:followerIds
            }
        },
        include:{
            users:true
        },
        orderBy:{
            createdAt:'desc'
        }
    })
}
async function createPost(userId:number,description:string) {
    return prisma.feed.create({
        data:{
            userId,
            description
        }
    })
    
}

const feedRepository = {
    getPost,
    createPost
}

export default feedRepository