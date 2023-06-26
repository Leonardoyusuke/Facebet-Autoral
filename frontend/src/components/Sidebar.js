'use client'
import { styled } from "styled-components"
import { Img } from "./Header";
import { MdEmojiEvents } from "react-icons/md"
import {FaHistory} from "react-icons/fa"
import { GiPodium,GiGibbet,GiMineExplosion} from "react-icons/gi"
import {CgCardSpades} from "react-icons/cg"
import { useRouter } from 'next/navigation';


export default function Sidebar(){
    const router = useRouter();
    const imageSrc = localStorage.getItem('img');
    const username = localStorage.getItem('name');
    


    return(
        <Side>
            <SideDiv first><Img side src={imageSrc} />  {username} </SideDiv>
            <SideDiv ><MdEmojiEvents/>torneios</SideDiv>           
            <SideDiv><FaHistory/>historico</SideDiv>
            <SideDiv onClick={() => router.push('/ranking')} ><GiPodium/>Ranking</SideDiv>
            <SideDiv onClick={() => router.push('/games/blackjack')} ><CgCardSpades/>Black Jack</SideDiv>
            <SideDiv onClick={() => router.push('/games/mines')}><GiMineExplosion/>Campo Minado</SideDiv>

        </Side>
    )
}
const SideDiv= styled.div`
display: flex;
align-items: center;
margin-top: ${props =>props.first?"1vw":"" } ;
height: 4vw;
svg{
    width: 2.5vw;
    height: 2.5vw;
    margin-left: 1vw;
    margin-right: 2vw;
}
`

const Side = styled.div`
position: fixed;
top: 5vw;
z-index: 3;
width: 28vw;
height: 100vw;
:hover{
    background-color: #E5E6E9;
}
cursor: pointer;
`