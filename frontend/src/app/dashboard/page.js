'use client'
import Feed from "@/components/feed/Feed"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { styled } from "styled-components"
import { useRouter } from 'next/navigation';
import Ranking from "@/components/ranking/Ranking"

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem('token');
  if(!token) router.push('/')

  return (<><Header/>
  <Sidebar/>
  <Content>
    <Feed/>
  <Ranking/>
  </Content>
  </>)
}

const Content = styled.div`
width: 40vw;
height: 200vw;
margin-top: 5vw;
margin-left: 30vw;
`