'use client'
import Header from "@/components/Header"
import Ranking from "@/components/ranking/Ranking"
import Sidebar from "@/components/Sidebar"
import { styled } from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { FaCoins } from "react-icons/fa"

export default function page({ params }) {
    const [feed, setFeed] = useState([])
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [date, setDate] = useState("")
    const [following, setFollowing] = useState(false)
    const [reload, setReload] = useState(false)


    const [coins, setCoins] = useState(0)
    useEffect(() => {
        profile();
        getFollows()
    }, [reload]);

    const token = localStorage.getItem('token');
    const enviar = { headers: { Authorization: token } };

    async function getFollows(){
        const id = params.id
        const payload = { profileId: id }
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/follow", payload, enviar);
            setFollowing(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    async function profile() {
        const id = params.id
        const payload = { profileId: id }
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/users/profile", payload, enviar);
            console.log(response)
            setFeed(response.data.bet);
            setName(response.data.username)
            setImg(response.data.pictureUrl)
            setCoins(response.data.coins)
            setDate(response.data.date)
        } catch (error) {
            console.log(error)
        }
    }
    async function unfollow(){
        const id = params.id
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_REACT_APP_API_URL + `/follow/${id}`,enviar);
            setReload(!reload)
        } catch (error) {
            console.log(error)
        }
    }
    async function follow(){
        const id = params.id
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + `/follow/${id}`,enviar);
            setReload(!reload)
        } catch (error) {
            console.log(error)
        }
    }
    


    return (<>
        <Header></Header>
        <Ranking></Ranking>
        <Sidebar></Sidebar>
        <User>
            <ProfileHeader>
                <img src={img} />
                <p> Historico de {name} 
                </p>
                <div><FaCoins/> {coins}</div>
                {following?<button onClick={unfollow} >Parar de seguir</button>: <button onClick={follow}>seguir</button>}
               

            </ProfileHeader>

            {feed.length ? (
                feed.map((f, index) => (
                    <Profile style={{ backgroundColor: f.win ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)' }}key={index}>
                        <img src={img} />

                        <p>{name} {f.win==true?"ganhou":"perdeu"} uma aposta no valor de  {f.coins} <FaCoins/> com uma Odds de {f.odds} no jogo {f.gameId == 1 ? "Blackjack" : "Campo minado"} </p>
                    </Profile>
                ))
            ) : (
                <Text>{name} ainda não fez nenhuma aposta</Text>
            )}

        </User>

    </>)
}
const ProfileHeader = styled.div`
display: flex;
position: relative;
align-items: center;
margin-top: 2vw;
height: 10vw;
p{
    font-size: 2vw;
    margin-left: 2vw;
}
img{
    height: 6vw;
    width: 6vw;
    border-radius: 50px;
}div{
    position: absolute;
    right: 26vw;
    margin-left: 4vw;
    font-size: 2vw;
}button{
    position: absolute;
    right: 30vw;
    margin-top: 8vw;
    background-color: green;
    width: 6vw;
    height: 3vw;
    border-radius: 12px;
    z-index: 2;

}
`
const Text = styled.text`
margin-top: 2vw;


`

const Profile = styled.div`
height: 8vw;
box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1) ;
font-size: 1.4vw;
border-radius: 20px;
width: 30vw;
position: relative;
margin-left: 2vw;
margin-top: 2vw;
p{
    position: absolute;
    top:2vw;
    left: 6vw;
    margin-right: 1vw;

};
img{
    width: 4vw;
    border-radius: 50px;
    margin-left: 1vw;
    margin-top: 1.5vw ;
    height: 4vw;
}
`

const User = styled.div`
margin-left: 30vw;
margin-top: 6vw;
`