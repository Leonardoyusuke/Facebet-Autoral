'use client'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { styled } from "styled-components"

import Ranking from "@/components/ranking/Ranking";
import Mines from "@/components/games/mine/Mines";

export default function Home() {


    return (<>
        <Header></Header><Ranking></Ranking><Sidebar></Sidebar>
        <GameTitle> Mines (5 bombas)</GameTitle>
        <ContainerGame>
            <Mines></Mines>
        </ContainerGame>

    </>
    )
}
export const GameTitle = styled.div`
display: flex;
left: 42vw;
font-size: 2vw;
position: fixed;
top:5.5vw;

`
export const ContainerGame = styled.div`
position: fixed;
top: 8vw;
width: 45vw;
height: 40vw;
margin-left: 28vw;

`