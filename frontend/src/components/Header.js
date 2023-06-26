'use client'
import { styled } from "styled-components"
import { AiFillHome } from "react-icons/ai";
import { FaGamepad, FaSearch, FaUserFriends, FaCoins } from "react-icons/fa"
import { MdEmojiEvents } from "react-icons/md"
import { RiLogoutBoxLine } from "react-icons/ri"
import { useState, useEffect } from "react";
import axios from "axios";
import CoinsContext from "@/context/userContext";
import { useRouter } from 'next/navigation';
import { useContext } from "react";


export default function Header() {
    const router = useRouter();
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [toggleResult, setToggleResult] = useState(false)
    const [iconSearch, setIconSearch] = useState("")
    const imageSrc = localStorage.getItem('img');
    const { coins,setCoins } = useContext(CoinsContext)

    async function fetchData() {

        try {
            const token = localStorage.getItem('token');
            const enviar = { headers: { Authorization: token } }
            const payload = { search: search }
            const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/users/search", payload, enviar);
            setToggleResult(true)
            setSearchResult(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (search.length > 2) {
            fetchData();
        }
        else {
            setSearchResult([])
            setToggleResult(false)

        }


         getCoins();
    }, [search,coins]);

    async function getCoins() {
        const token = localStorage.getItem('token');
        const enviar = { headers: { Authorization: token } }
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/users/coins", enviar);
            setCoins(response.data.coins)
        } catch (error) {
            console.log(error);
        }
    }
    function logout(){
        localStorage.clear
        router.push('/')
    }

    return (<Div father>
        <Div >LOGO
            <Div1>{iconSearch ? <FaSearch /> : <></>}
                <InputHeader
                    onChange={(e) => setSearch(e.target.value)}
                    minLength={3}
                    debounceTimeout={300}
                    placeholder="            Pesquisar no FaceBet" />

                {toggleResult ? <SearchBarResult >
                    {searchResult.map((s) => <DivResult onClick={() => router.push(`/user/${s.id}`)}>
                        <img src={s.pictureUrl} />
                        <div > {s.username}</div>
                    </DivResult>)}
                </SearchBarResult> : <></>}

            </Div1>
        </Div>
        <Div>
            <HeaderLayout mid>
                <AiFillHome onClick={() => router.push('/dashboard')} />
                <MdEmojiEvents />
                <FaGamepad />
                <FaUserFriends />
            </HeaderLayout>
        </Div>
        <Div right>
            <HeaderLayout >
                <Coins onClick={() => router.push('/coins')} >
                    <FaCoins coins />
                    <p>{coins}</p>
                </Coins>
                <Img src={imageSrc} />
                <RiLogoutBoxLine onClick={logout} logout />
            </HeaderLayout>
        </Div>

    </Div>)
}

const DivResult = styled.div`
display:flex;
margin-top: 1vw;
img{
    border-radius: 15px;
    width: 3vw;
    height: 3vw;
}
div{
    margin-left: 1vw;
    display: flex;
    align-items: center;
}
`
const SearchBarResult = styled.div`
width: 25vw;    
height: 15vw;
background-color: #FFFFFF;
border-radius: 15px;
z-index:2;
:hover{
    background-color: #E5E6E9;
}
`

const Coins = styled.div`
margin-left:-5vw;
margin-right: 2vw;
background-color: lightgray;
border-radius: 15px;
width: 10vw;
height: 3.5vw;
position: absolute;
cursor: pointer;
box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1) ;
svg{
    margin-top: 0.3vw;
    margin-left: 0.5vw;
};
p{
    position: relative;
    right: -5vw;
    top: -2.4vw;
    z-index: 1;

}
`

export const Img = styled.img`
border-radius: 20px;
height: ${props => props.side ? "3vw" : "3.5vw"} ;
width: ${props => props.side ? "3vw" : "3.5vw"};
margin-right: ${props => props.side ? "1vw" : "4vw"};
margin-left: ${props => props.side ? "1vw" : "7vw"};
`

const Div1 = styled.div`
position: absolute;
left: 5vw;
width: 18vw;
height: 3vw;
box-sizing: content-box;
svg{
    position:relative;
    left: 2vw;
    top:0.3vw;
}
`

const InputHeader = styled.input`
width: 25vw;
height: 3vw;
border-radius: 15px;
`

const Div = styled.div`
position: ${props => props.father ? "fixed" : ""};
display:flex;
justify-content: ${props => props.father ? "space-between" : ""};
align-items: center;
background-color:white;
width: ${props => props.father ? "100vw" : "19vw"};
height: ${props => props.father ? "5vw" : ""};
box-shadow:${props => props.father ? "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)" : ""}; 
z-index:4 ;
`
const HeaderLayout = styled.div`
display: flex;
justify-content: space-between;
margin-right: ${props => props.right ? "-1vw" : ""};
margin-left: ${props => props.mid ? "-2.5vw" : ""}  ;
:hover{
        color:#1A73E3;
    }
svg{
    height:3vw;
    width: 3vw;
    margin-right: ${props => props.right ? "2vw" : "4vw"};
    cursor: pointer;
}
`