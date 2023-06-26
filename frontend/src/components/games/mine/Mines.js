import { useState,useContext } from "react";
import { styled } from "styled-components";
import { GiMineExplosion } from "react-icons/gi";
import axios from "axios";
import CoinsContext from "@/context/userContext";


export default function Mines() {
  const mock = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20,
    "bomb", "bomb", "bomb", "bomb", "bomb"
  ];
  const [shuffledMock, setShuffledMock] = useState([]);
  const [stopButton, setStopButton] = useState(false);
  const [playButton, setPlayButton] = useState(true);
  const [earns, setEarns] = useState(0);
  const [bet, setBet] = useState(1);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [odds, setOdds] = useState(1);
  const token = localStorage.getItem('token');
  const enviar = { headers: { Authorization: token } };
  const { coins,setCoins } = useContext(CoinsContext)
  console.log(odds)
  let win = null


  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startGame(event) {
    console.log(bet,coins)
    if (!bet){
      return alert("Escolha um valor para apostar");
    }else if(bet>coins){
      return alert("Aposta ultrapassa seu valor em conta")
    }
    console.log(coins,bet)
    setEarns(bet);
    event.preventDefault();
    const shuffledArray = shuffle(mock);
    setShuffledMock(shuffledArray);
    setStopButton(true);
    setPlayButton(false);
    setShowAll(false)
    setOdds(1);
    setClickedIndices([])

  }

  function turnCard(index) {
    if (!shuffledMock.length) return; // Verificar se shuffledMock tem um valor
    if (shuffledMock[index] === "bomb") {
      setEarns(0);
      lose();
    } else {
      setEarns((prevEarns) => prevEarns * (12 / 10));
      setEarns((prevEarns) => prevEarns.toFixed(0));
      setClickedIndices((prevIndices) => [...prevIndices, index]);
      setOdds((prevCount) => prevCount * 12/10);
      setOdds((prevCount) => parseFloat(prevCount.toFixed(1)));
    }
  }

  function lose() {
    alert("perdeu");
    setPlayButton(true);
    setStopButton(false);
    setShowAll(true);
    console.log(odds)
    win=false
    serverComunication(win)
    
  }

  function stop(event) {
    setShuffledMock([]);
    setPlayButton(true);
    setStopButton(false);
    setClickedIndices([])
    setShowAll(true);
    console.log(odds)
    win=true
    serverComunication(win)
  }

  async function serverComunication(win){
    try {
      const payload = { gameId: 4, coins: bet, odds: odds, win };
      const response =await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/bet', payload, enviar);
      console.log(response)
      setCoins(response.data.coins)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Game>
        {shuffledMock.map((m, index) => (
          <StyledDiv
            onClick={() => turnCard(index)}
            key={index}
            clicked={clickedIndices.includes(index)}
            showAll={showAll}
            isBomb={m === "bomb"}
          >
          {showAll && m === "bomb" ? (
            <GiMineExplosion size={24} />
          ) : null}
          {showAll || clickedIndices.includes(index) ? "" : null}
          </StyledDiv>
        ))}
      </Game>
      <Footer>
        <form onSubmit={startGame}>
          <input
            type="number"
            onChange={(e) => setBet(parseFloat(e.target.value))}
            min={1}
            placeholder="valor"
            required
          />
          {playButton ? <Button>Jogar</Button> : null}
        </form>
        {stopButton ? <Button onClick={stop}>parar</Button> : null}
        <Returns>Ganhos: {earns}</Returns>
      </Footer>
    </Container>
  );
}

const Returns = styled.div`
  color: white;
`;

const StyledDiv = styled.div`
  margin: 1vw;
  width: 5vw;
  height: 4.8vw;
  background-color: ${(props) =>
    props.clicked ? "blue" :  "green"};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5vw;
  cursor: pointer;
`;

const Button = styled.button`
width: 6vw;
height: 3vw;
border-radius: 4px;
background-color: red;
cursor:pointer;
border: none;
color: white;
margin-right: 1vw;
`


const Game = styled.div`
width: 80%;
margin-left: 10%;
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-gap: 0.1vw;

`

const Footer = styled.div`
display: flex;
align-items: center;
width: 100%;
background-color: black;
height: 15%;
position: absolute;
z-index: 4;
top: 34vw;
input{
  margin-left: 2vw;
  margin-right: 1vw;
  width: 6vw;
  height: 3vw;
  border-radius: 4px;
  border: none;

}
`

const Container = styled.div`
position: relative;
height: 100%;
background-color: gray;
width: 100%;

`