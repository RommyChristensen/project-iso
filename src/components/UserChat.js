import * as React from 'react';
import { fire } from "../config/firebase";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { query, collection, where, getDocs, addDoc, orWhere, orderBy, startAt, endAt, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { onSnapshot } from 'firebase/firestore';
import { useContext, useState } from "react";
import { UserContext } from "../config/UserContext";
import { Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import getRoom from "../store/Service";
import 'bootstrap/dist/css/bootstrap.min.css';

const leftStyle = {
    // position:"", 
    // top:"200px", 
    textAlign: 'left',
    marginBottom:"10px",
    width:"100px",
    alignItems: 'flex-start',
    // width: "auto"
}

const rightStyle = {
    // position:"", 
    // top:"200px", 
    textAlign: 'right',
    marginBottom:"10px",
    width:"100px",
    alignItems: 'flex-end',
    marginLeft:"auto"
    // width: "auto"
    
}


const UserChat = () => {
    const { userActive, setUser, room, setRoom, activeRoom, setActiveRoom } = useContext(UserContext);
    const [ text, setText ] = useState('');
    const [selectContact, setSelectContact] = React.useState({});
    
    const getMessages = () => {
        if(activeRoom){
            const doc = fire.collection('room').doc(activeRoom.id);
        }
    }
    async function  sendChat(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // // eslint-disable-next-line no-console
        let chats = data.get('message');
        // alert(activeRoom.id)

        let newChat=
        {
            "from":userActive.username,
            "message":chats,
            "read":false,
            "sent_time":new Date().toLocaleString()
        }

        console.log(activeRoom.id)


        const docChat = doc(fire, 'room', activeRoom.id);
        const dataChat = await getDoc(docChat);

        var tempChat = dataChat.data().chats;

        tempChat.push(newChat);

        console.log(tempChat);
        await updateDoc(docChat, {
            chats:tempChat
        })

        setRoom(await getRoom(userActive.username));

        const room = {
            id: dataChat.id,
            chats: tempChat,
            fname: dataChat.data().fname,
            lname: dataChat.data().lname,
            user1: dataChat.data().user1,
            user2: dataChat.data().user2
          }

        setActiveRoom(room)
        // document.getElementById('message').setAttribute('value','')

        document.getElementById("message").value="";
        
    };
    const generateMessages = () => {
        console.log("chats", activeRoom.chats);
        const chats = activeRoom.chats;

        if(activeRoom.chats){
            return chats.map(c => {
                if(c.from === userActive.username) {
                    return <Grid className='row' item style={{width:"100%"}}>
                        <Card style={rightStyle} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {c.message}
                            </Typography>
                        </CardContent>
                    </Card>
                        </Grid>
                }else{
                    return <Grid item className='row' style={{width:"100%"}}>
                    <Card style={leftStyle} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {c.message}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                }
            })
        }
        return <div></div>;
    }

    return (
        <>
            <Grid item style={{width:'90%',height:'700px',overflowY:"auto",scrollbarWidth: "none",marginLeft:'10px', marginRight:'10px', backgroundColor:''}}>
                { generateMessages() }
                {/* <Card style={{position:"absolute", top:"80px", float:"left"}} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day 
                    </Typography>
                </CardContent>
                </Card>
                <Card style={{position:"absolute", top:"120px", right:10}} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the DayWord of the DayWord of the DayWord of the DayWord of the DayWord of the DayWord of the Day
                    </Typography>
                </CardContent>
                </Card>
                <Card style={{position:"absolute", top:"220px", right:10}} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                    </Typography>
                </CardContent>
                </Card> */}
            </Grid>
            <Grid item component="form" onSubmit={sendChat} style={{width:"70%",position:"absolute",bottom:'10px',marginLeft:'10px', marginRight:'10px'}}>
                {/* <Grid item style={{flex:3, width:"60%"}} > */}
                    <TextField id="message" name="message" onChange={(e) => setText(e.target.value)} style={{width:"90%",backgroundColor:"white"}} hiddenLabel fullWidth placeholder='Enter A Message' variant="standard"  />

                {/* </Grid> */}
                {/* <Grid item style={{flex:1,width:"40%"}}  > */}
                <Button style={{width:"10%"}}
                    type='submit'
                >
                    SEND
                </Button>
                {/* </Grid> */}
            </Grid>
        </>
    )
}

export default UserChat;