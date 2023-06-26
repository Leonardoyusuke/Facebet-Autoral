'use client'
import Account from '@/components/Account'
import { CoinsProvider } from '@/context/userContext'
import { useState } from 'react'
import styled from 'styled-components'

export default function LoginPage() {
    return (<>
        <Display><Layout>
            <Text>FaceBet<p>Conecte-se com seus amigos</p>
                <p> do mundo todo enquanto aposta</p> </Text>
        </Layout>
        <Layout2>
        <Account></Account>
</Layout2>
        </Display></>
    )
}

const Display = styled.div`
margin-top: -8px;
margin-left: -8px;
display:flex;
background-color:gray;
width:100vw;
height: 100vw;
background-color: #EFF2F5;
`

const Layout = styled.div`
margin-top:10vw;
margin-left:15vw;
`
const Layout2 = styled.div`
margin-top:10vw;
margin-left:15vw;
width: 25vw;
height: 25vw;
border-radius:10px;
border-color: #8A8D91;
background-color:white;
box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
`

const Text = styled.text`
font-size:8vw;
color: #1977F2;
p{
    font-size: 1.5vw;
    margin-top: 0vw;
    color : black;
}

`