'use client'
import { useContext, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { styled } from "styled-components";
import CoinsContext from "@/context/userContext";
export default function Account() {
    const { coins, setCoins } = useContext(CoinsContext)
    const router = useRouter();
    const [loginEnvironment, setLoginEnvironment] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [pictureUrl, setPictureUrl] = useState("")


    function signUpEnvironment() {
        setLoginEnvironment(false)
    }

    async function login(event) {
        event.preventDefault()
        const payload = { email, password }
        try {
            console.log(payload)
            const log = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/users/signin", payload)
            setCoins(log.data.checkEmail.coins)
            localStorage.setItem("token", log.data.token)
            localStorage.setItem("img",log.data.checkEmail.pictureUrl)
            localStorage.setItem("name",log.data.checkEmail.username)
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
    async function signup(event) {
        event.preventDefault()
        const payload = { username, email, password, pictureUrl }
        try {
            const create = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/users/signup", payload)
            localStorage.setItem("token", create.data)
            localStorage.setItem("Imagem",pictureUrl)
            router.push('/dashboard')

        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        {loginEnvironment ? <>
            <Forms onSubmit={login}>
                <Input user
                    placeholder='   Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input type='password' placeholder='   Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button  login >Entrar</Button>
                <p>Esqueceu a senha?</p>
            </Forms>
            <Layout3>
                <Line></Line>
                <Button onClick={signUpEnvironment} >Cadastre-se</Button>
            </Layout3></> : <>
            <Text register>Cadastro</Text>
            <Forms onSubmit={signup}>
                <Input
                    placeholder='   Username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input  placeholder='   Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder='   Password'
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input placeholder='   Picture Url'
                    onChange={(e) => setPictureUrl(e.target.value)}
                />
                <Button>Criar</Button>   </Forms></>}
    </>)
}
export const Line = styled.div`
margin-top: 0.5vw;
border: 1px solid gray;
width: 17vw;
`

export const Layout3 = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

export const Button = styled.button`
width: 20vw;
height: 3vw;
font-size: medium;
border-radius: 6px;
background-color: ${props => (props.login ? "#1977F2" : "#42B729")};
margin-top: ${props => (props.login ? "1vw" : "2vw")};
color: white;


`
export const Forms = styled.form`
display: flex;
flex-direction: column;
align-items: center;
p{
    margin-top: 1vw;
    margin-bottom: 1vw;
    color: #1977F2;
}
`
export const Input = styled.input`
margin-top: ${props => (props.user ? "3vw" : "1vw")};   
height: 3vw;
width: 20vw;
border-radius: 5px;
border-color: black;
`

export const Display = styled.div`
display:flex;`

export const Layout = styled.div`
margin-top:10vw;
margin-left:15vw;
`
export const Layout2 = styled.div`
margin-top:10vw;
margin-left:15vw;
width: 25vw;
height: 25vw;
border-radius:10px;
border-color: #8A8D91;
background-color:white;
`

export const Text = styled.text`
font-size: ${props => (props.register ?"2.5vw" : "8vw"  )};
margin-left: ${props => (props.register? "7vw" : "")};
color: #1977F2;
p{
    font-size: 1.5vw;
    margin-top: -1vw;
    color : black;
}

`