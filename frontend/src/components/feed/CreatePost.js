import React, { useState } from "react";
import styled from "styled-components";

export default function CreatePost() {
    const [expand, setExpand] = useState(false);

    

    return (
        <CreatePos expand={expand}>
            <h1>Fazer um post</h1>
            <input onClick={() => setExpand(true)} placeholder="No que está pensando?" />
            <button>publicar</button>
        </CreatePos>
    );
}

const CreatePos = styled.div`
    display: flex;
    flex-direction: column;
    height: ${props => (props.expand ? "18vw" : "10vw")};
    width: 100%;
    border-radius: 20px;
    box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1) ;

input {
    width: 90%;
    border-radius: 2px;
    margin: 5%;
    box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1) ;
    height: ${props => (props.expand ? "70%" : "40%")};
}
button{
    display: ${props => (props.expand?"line":"none")};
    box-shadow:0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1) ;
    border-radius: 20px;
    height: 3vw;
    margin-left: 14vw;
    width: 30%;
    margin-bottom: 1vw;
    
}
h1{
    margin-left: 12vw;
    margin-top: 1vw;
}
`;

