import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { FaCoins } from "react-icons/fa"


export default function Post() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const token = localStorage.getItem('token');
    const enviar = {headers:{Authorization:token}}
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + "/feed",enviar);
      setFeed(response.data);
    } catch (error) {
    }
  }

  return (
    <PostEnvironment>
      {feed.length > 0 ? (
        feed.map((f) => <PostLayout key={f.id}>
        <img src={f.users.pictureUrl}/>
        <h1>{f.users.username}</h1>
        <p><FaCoins/>   {f.users.coins}</p>
        {f.description?f.description:""}
        </PostLayout>)
      ) : (
        <div>Nenhum post ate o momento.</div>
      )}
    </PostEnvironment>
  );
}

const PostLayout = styled.div`

position: relative;
height: 10vw;
margin-bottom: 2vw;
border-radius: 20px;
    box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1) ;
img{
    height: 4vw;
    width: 4vw;
    margin: 1vw;
    border-radius: 20px;
}
h1{
    position: absolute;
    top: 1vw;
    left:7vw;
    cursor: pointer;
}
p{
    position: absolute;
    top: 1vw;
    left: 33vw;
    display: flex;
}svg{
  margin-right: 1vw;
}
`


const PostEnvironment = styled.div`
height:10vw ;
margin-top: 1vw;

`