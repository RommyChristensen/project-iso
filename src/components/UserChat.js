import * as React from 'react';
import { fire } from "../config/firebase";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { query, collection, where, getDocs, addDoc, orWhere, orderBy, startAt, endAt, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { onSnapshot } from 'firebase/firestore';
import { useContext, useState } from "react";
import { UserContext } from "../config/UserContext";
import { Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';

const leftStyle = {
    position:"absolute", 
    top:"80px", 
    float:"left"
}

const rightStyle = {
    position:"absolute", 
    top:"120px", 
    right:10
}


const UserChat = () => {
    const { userActive, setUser, room, setRoom, activeRoom } = useContext(UserContext);
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

        console.log(newChat)
        const db = collection(fire, 'room');
        // const selectedRoom = fire.collection('room').doc(activeRoom.id);
        // console.log(selectedRoom)
        // var docChat = fire.collection('room').doc(activeRoom.id);
        const docChat = doc(db, "room", activeRoom.id);
        console.log(docChat)
        await updateDoc(docChat, {
            chats: arrayUnion(newChat)
        });

        document.getElementById("message").value("");
        
    };
    const generateMessages = () => {
        console.log("chats", activeRoom.chats);
        const chats = activeRoom.chats;

        if(activeRoom.chats){
            return chats.map(c => {
                if(c.from === userActive.username) {
                    return <Card style={rightStyle} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {c.message}
                            </Typography>
                        </CardContent>
                    </Card>
                }else{
                    return <Card style={leftStyle} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {c.message}
                            </Typography>
                        </CardContent>
                    </Card>
                }
            })
        }
        return <div></div>;
    }

    return (
        <>
            <Grid item style={{width:'90%',height:'700px',marginLeft:'10px', marginRight:'10px', backgroundColor:''}}>
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
                    <TextField id="message" name="message" onChange={(e) => setText(e.target.value)} style={{width:"90%",backgroundColor:"white"}} hiddenLabel fullWidth id="standard-basic" placeholder='Enter A Message' variant="standard"  />

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