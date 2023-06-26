import followRepositories from "@/repositories/follow-repositories";

async function getFollowers(profileId:number,userId:number) {
    const followers = await followRepositories.followers(profileId)
    const list = []
    for(let i = 0; i<followers.length;i++){
        list.push(followers[i].followerId)
    }
    if(list.includes(userId)){
       return true 
    }else{
        return false
    }
}

async function unfollow(profileId:number, userId:number) {
    const unfollow = await followRepositories.unfollow(profileId, userId)
    return unfollow

}

async function follow(profileId:number,userId:number) {
    const follow = await followRepositories.follow(profileId,userId)
    return follow
}

const followService = {
    getFollowers,
    unfollow,
    follow
}

export default followService