'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { useContext } from "react";
import CoinsContext from "@/context/userContext";


export default function Blackjack() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const { coins,setCoins } = useContext(CoinsContext)
  console.log(playerHand, dealerHand)

  useEffect(() => {
    initializeDeck();
  }, []);
  useEffect(() => {
    const playerTotal = calculateHandValue(playerHand);
    const dealerTotal = calculateHandValue(dealerHand);
    console.log(dealerTotal)

    if (playerTotal > 21) {
      setGameState('dealer_win');
    }

    if (dealerTotal > 21) {
      setGameState('player_win');
    }
  }, [playerHand, dealerHand]);


  const initializeDeck = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const newDeck = [];
    for (let suit of suits) {
      for (let rank of ranks) {
        newDeck.push({ rank, suit });
      }
    }

    setDeck(newDeck);
  };

  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const dealCards = () => {

    const shuffledDeck = shuffleDeck([...deck]);
    const playerCards = [shuffledDeck.pop(), shuffledDeck.pop()];
    const dealerCards = [shuffledDeck.pop(), shuffledDeck.pop()];

    setDeck(shuffledDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameState('playing');
  };

  const calculateHandValue = (hand) => {
    let sum = 0;
    let hasAce = false;

    for (let card of hand) {
      if (card.rank === 'A') {
        sum += 11;
        hasAce = true;
      } else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
        sum += 10;
      } else {
        sum += parseInt(card.rank);
      }
    }

    if (hasAce && sum > 21) {
      sum -= 10;
    }

    return sum;
  };
  const handleHit = () => {
    if (calculateHandValue(playerHand) < 21) {
      const newCard = deck.pop();
      setPlayerHand((prevHand) => [...prevHand, newCard]);
      setDeck([...deck]);
    }

    if (calculateHandValue(playerHand) > 21) {
      setGameState('dealer_win');
    }
  };
  const handleStand = () => {
    const dealerHandValue = calculateHandValue(dealerHand);
    const playerTotal = calculateHandValue(playerHand);
  
    const drawDealerCard = (currentDeck) => {
      if (dealerHandValue >= 17) {
        setTimeout(() => {
          compareHands(playerTotal, dealerHandValue);
        }, 500);
        return;
      }
  
      const newCard = currentDeck.pop();
      const updatedDealerHand = [...dealerHand, newCard];
      setDealerHand(updatedDealerHand);
      setDeck([...currentDeck]);
  
      const updatedDealerHandValue = calculateHandValue(updatedDealerHand);
      if (updatedDealerHandValue < 17) {
        setTimeout(() => drawDealerCard([...currentDeck]), 2000); // Delay the next card draw
      } else {
        setTimeout(() => {
          compareHands(playerTotal, updatedDealerHandValue);
        }, 500);
      }
    };
  
    drawDealerCard([...deck]);
  };


const compareHands = (playerTotal, dealerTotal) => {
  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    setGameState('player_win');
    handleGameResult('player_win');
  } else if (playerTotal === dealerTotal) {
    setGameState('push');
  } else {
    setGameState('dealer_win');
    handleGameResult('dealer_win');
  }
};
  
  

  const restartGame = () => {
    initializeDeck();
    setPlayerHand([]);
    setDealerHand([]);
    setGameState('');
    setBetAmount(0);
  };

  console.log(gameState)
  const renderGameResult = () => {
    if (gameState === 'player_win') {
      return <p>Você ganhou!</p>;
    } else if (gameState === 'dealer_win') {
      return <p>Você Perdeu!</p>;
    } else if (gameState === 'push') {
      return <p>Empate</p>;
    }
  };
  

async function serverComunication(win){
  console.log('entrou');
  try {
    const token = localStorage.getItem('token');
    const enviar = { headers: { Authorization: token } };
    const payload = { gameId: 1, coins: betAmount, odds: 2, win };
    console.log(payload);
    const response =await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/bet', payload, enviar);
    setCoins(response.data.coins)
    console.log(response, '2');
  } catch (error) {
    console.log(error);
  }
};

const handleGameResult = (result) => {
  console.log("entrou2")
  let win = null;
  if (result === 'player_win') {
    win = true;
  } else if (result === 'dealer_win') {
    win = false;
  }
  serverComunication(win);
};



  const handleBetChange = (event) => {
    setBetAmount(parseInt(event.target.value));
  };

  // Render the game components
  return (
    <Container>
      {gameState === '' && (
        <Bet>
          <input type="number" id="betAmount" value={betAmount} min={1} max={100000} onChange={handleBetChange} />
          <button onClick={dealCards}>Aposta</button>
        </Bet>
      )}
      {gameState === 'playing' && (
        <ButtonContainer>
          <Button onClick={handleHit}>Carta</Button>
          <Button onClick={handleStand}>Parar</Button>
        </ButtonContainer>
      )}
      {(gameState === 'player_win' || gameState === 'dealer_win' || gameState === 'push') && (
        <div>
            {renderGameResult()}
          <Button restart onClick={restartGame}>Jogar novamente</Button>
        </div>
      )}
      {gameState === '' ? <></> : <> <H2>Mão do Dealer</H2></>}

      <Ul>
        {dealerHand.map((card, index) => (
          <Card key={index}>
            <div>{`${card.rank}`}</div>
            <div>{`${card.suit}`}</div>
            <Invert under >{`${card.suit}`}</Invert>
            <Invert >{`${card.rank}`}</Invert>
          </Card>
        ))}
      </Ul>
      {gameState === '' ? <></> : <> <H2 under>Sua mão</H2></>}


      <Ul>
        {playerHand.map((card, index) => (
          <Card key={index}>
            <div>{`${card.rank}`}</div>
            <div>{`${card.suit}`}</div>
            <Invert under >{`${card.suit}`}</Invert>
            <Invert >{`${card.rank}`}</Invert>
          </Card>
        ))}
      </Ul>
    </Container>
  );
}

const H2 = styled.h2`
margin-left: 2vw;
margin-top: ${props=>props.under?"2vw":""};
`

const ButtonContainer = styled.div`
margin-left: 2vw;
`

const Ul = styled.ul`
display: flex;
margin-left: 2vw;
`

const Container = styled.div`
background-color: #32e565;
position: absolute;
width: 100%;
height: 100%;
`
const Card = styled.div`
position: relative;
width: 8vw;
background-color: violet;
border-radius: 8px;
height: 10vw;
margin-right: 1vw;
div{
  font-size: 2vw;
  margin: 1vw;
  width: 1vw;
  height: 1vw;
}
`
const Invert = styled.div`
position: absolute;
  top: ${props => props.under ? "5.5vw" : "7.5vw"};
  left: 4.8vw;
  width: 1vw;
  height: 1vw;
  transform: rotate(180deg);
`

const Button = styled.button`
position: relative;
width: ${props => props.restart ? "10vw" : "7vw"};
margin-left: ${props=>props.restart?"2vw":""};
border-radius: 10px;
height: 3.5vw;
top: 34vw;
left: 0vw;
margin-right: 2vw;
`

const Bet = styled.div`
position: relative;
top: 35vw;
left: 27vw;
button{
  margin-left: 2vw;
  height: 2vw;
  width: 5vw;
}
input{
  width: 7vw;
  height: 2vw;
}
`