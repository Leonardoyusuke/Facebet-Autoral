'use client'
import { styled } from "styled-components"
import axios from "axios";
import { useState } from "react";
import CoinsContext from "@/context/userContext";
import { useContext } from "react";

export default function Coins(){
    const { coins, setCoins } = useContext(CoinsContext)
    console.log(coins)
    const [cupom, setCupom] = useState("")

    async function freeCoins(){
        try {
            const token = localStorage.getItem('token');
            const enviar = { headers: { Authorization: token } }
            const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/users/freecoins", enviar);
            setCoins(response.data.coins)
            alert("Coins adicionadas")
        } catch (error) {
            alert(error.response.data)
        }
    }
    async function sendCupom(event){
        event.preventDefault(); 
        console.log(cupom)
        try {
            const token = localStorage.getItem('token');
            const enviar = { headers: { Authorization: token } }
            const payload = {cupom:cupom}
            const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/users/cupom",payload ,enviar);
            setCoins(response.data.coins)
            alert("Coins adicionadas a sua conta")

        } catch (error) {
            if(error.message =="Request failed with status code 401"){
                alert("Cupom invalido ou expirado")
            }
        }
    }


    return(<>
    <Div>
    Colete suas coins diariamente aqui
    <button onClick={freeCoins}>500 Coins</button>
    </Div>
        <Cupom>Tem cupom de coins?
    <form onSubmit={sendCupom} >
        <input placeholder="cupom"   onChange={(e) => setCupom(e.target.value)}/>
        <button type="submit" >Enviar</button>
    </form>
    </Cupom>
    </>
    )
}


const Div = styled.div`
display: flex;
flex-direction: column;
position: relative;
font-size: 2vw;
justify-content: center;
button{
    width: 8vw;
    position: absolute;
    height: 3vw;
    top: 5vw;
    border-radius: 10px;
    box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1) ;
};
`

const Cupom = styled.div`
font-size: 2vw;
display: flex;
flex-direction: column;
margin-top: 10vw;
button{
    width: 4vw;
    margin-left: 2vw;
    height: 2vw;
    border-radius: 10px;
    box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
};
input{
    border-radius: 5px;
    box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
    height: 2vw;
    width: 18vw;
}
`