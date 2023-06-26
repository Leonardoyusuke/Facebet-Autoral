'use client'
import { useState, useEffect,useContext } from "react";
import { styled } from "styled-components"
import axios from "axios";
import { FaCoins } from "react-icons/fa"
import { useRouter } from 'next/navigation';
import CoinsContext from "@/context/userContext";



export default function RankingFriends() {
    const [ranking, setRanking] = useState([]);
    const router = useRouter();
    const { coins } = useContext(CoinsContext)


    useEffect(() => {
        getRanking();
    }, [coins]);

    async function getRanking() {
        const token = localStorage.getItem('token');
        const enviar = { headers: { Authorization: token } };

        try {
            const response = await axios.get("http://localhost:5004/Ranking/friend", enviar);
            setRanking(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <text>Ranking dos Seguidores</text>
            {ranking.length > 0 ? (
                ranking.map((r) => (
                    <RankingLayout onClick={() => router.push(`/user/${r.id}`)} key={r.id}>
                        <Div user>
                            <img src={r.pictureUrl} />
                            <div>{r.username}</div>
                        </Div>
                        <Div><FaCoins/>{r.coins}</Div>
                    </RankingLayout>
                ))
            ) : (
                ""
            )}
        </Layout>
    );
}

const Div = styled.div`
margin-right: ${props => props.user?"0vw":"2vw" };
height: 4vw;
display: flex;
align-items: center;
div{
    margin-left:1vw;
}
cursor: pointer;
svg{
    margin-right: 0.5vw;
}
`

const Layout = styled.div`
:hover{
    background-color: #E5E6E9;
}
text{
    font-size: 2vw;
    pointer-events: none;
}
`

const RankingLayout = styled.div`
display: flex;
grid-column-start:initial;
justify-content: space-between;
align-items:center;
img{
    margin-left: 0.5vw;
    width: 3vw;
    height: 3vw;
    border-radius: 20px;
}`