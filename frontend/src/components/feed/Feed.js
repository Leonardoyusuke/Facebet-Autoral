import { styled } from "styled-components"
import CreatePost from "./CreatePost"
import Post from "./Posts"

export default function Feed(){
    return(<FeedLayout>
        <Content>
            <CreatePost></CreatePost>
        <Post/>
        </Content>
    </FeedLayout>)
}

const Content = styled.div`
height: 10vw;
margin-top: 6vw;
`

const FeedLayout = styled.div`
width: 100%;
height: 100%;

`
