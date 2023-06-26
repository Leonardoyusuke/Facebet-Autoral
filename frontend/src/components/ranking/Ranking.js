import { styled } from "styled-components";
import RankingGeral from "./RankinGeral";
import RankingFriends from "./RankingFriends";

export default function Ranking(){
    return(
        <RankingLayout>
        <RankingGeral></RankingGeral> 
        <RankingFriends></RankingFriends>
        </RankingLayout>
    )
}

const RankingLayout = styled.div`
position: fixed;
z-index: 2;
right: 0vw;
top: 6vw;
width: 25vw;
height: 80%;
`