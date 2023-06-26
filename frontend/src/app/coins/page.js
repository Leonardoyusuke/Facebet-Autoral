'use client'
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { styled } from "styled-components"
import Ranking from "@/components/ranking/Ranking"
import Coins from "@/components/Coins"
export default function home() {
    return (<>
        <Header />
        <Sidebar />
        <Content><Coins/></Content>
        <Ranking />
       
    </>)
}

const Content = styled.div`
width: 40vw;
height: 200vw;
margin-top: 6vw;
margin-left: 30vw;
`