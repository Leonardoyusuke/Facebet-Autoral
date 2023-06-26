import rankingRepositories from "@/repositories/ranking.repositories";

async function getGeralRanking() {
    const ranking = await rankingRepositories.getGeralRanking()
    return ranking

}
async function getFriendRanking(userId: number) {
    const ranking = await rankingRepositories.getFriendRanking(userId)
    return ranking

}

async function getRankingPage(userId: number) {
    const ranking = await rankingRepositories.getRankingPage()
    const list = []
    for (let i = 0; i < ranking.length; i++) {
        list.push(ranking[i].id)
    }
    if (list.includes(userId)) {
        return ranking
    } else {
        const newRanking = await rankingRepositories.getNewRankingPage(userId)
        ranking.push(newRanking)
        return ranking
    }

}



const rankingService = {
    getGeralRanking,
    getFriendRanking,
    getRankingPage
}

export default rankingService