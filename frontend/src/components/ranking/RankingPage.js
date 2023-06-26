'use client'
import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { FaCoins } from "react-icons/fa"


export default function RankingPage() {
    const [ranking, setRanking] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getRanking()
    }, []);

    async function getRanking() {
        const token = localStorage.getItem('token');
        const enviar = { headers: { Authorization: token } };
        try {
            const response = await axios.get("http://localhost:5004/Ranking/page", enviar);
            console.log(response)
            setRanking(response.data);

        } catch (error) {
        }
    }
    return (<> {ranking.length > 0 ? (
        ranking.map((r) => (
            <RankingLayout onClick={() => router.push(`/user/${r.id}`)} key={r.id}>
                <Div  user>
                    <img src={r.pictureUrl} />
                    <div>{r.username}</div>
                </Div>
                <Div><FaCoins/>{r.coins}</Div>
            </RankingLayout>
        ))
    ) : (
        ""
    )}</>)
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
z-index: 3;
:hover{
    background-color: #E5E6E9;
}
text{
    font-size: 2vw;
    margin-left: 5vw;
    pointer-events: none;
}
`

const RankingLayout = styled.div`
display: flex;
grid-column-start:initial;
justify-content: space-between;
align-items:center;
img{
    width: 3vw;
    margin-left: 0.5vw;
    height: 3vw;
    border-radius: 20px;
}`