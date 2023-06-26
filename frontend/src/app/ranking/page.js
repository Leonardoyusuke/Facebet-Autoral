'use client'
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Ranking from "@/components/ranking/Ranking"
import RankingPage from "@/components/ranking/RankingPage"
import { styled } from "styled-components"

export default function home() {
    return (<>
        <Header />
        <Sidebar />
        <Content><RankingPage/></Content>
       
    </>)
}

const Content = styled.div`
width: 40vw;
height: 200vw;
margin-top: 6vw;
margin-left: 30vw;
`