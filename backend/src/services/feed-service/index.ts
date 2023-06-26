import feedRepository from "@/repositories/feed-repositories"

async function getPosts(userId:number) {
    const get = await feedRepository.getPost(userId)
    return get 
    
}

async function postFeed(userId:number,description:string) {
    const post = await feedRepository.createPost(userId,description)
    return post 
}


const feedService = {
    getPosts,
    postFeed
}

export default feedService