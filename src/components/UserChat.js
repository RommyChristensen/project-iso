import { fire } from "../config/firebase";
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
    
    const getMessages = () => {
        if(activeRoom){
            const doc = fire.collection('room').doc(activeRoom.id);
        }
    }

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
            <Grid item style={{width:"80%",position:"absolute",bottom:'10px',marginLeft:'10px', marginRight:'10px'}}>
                {/* <Grid item style={{flex:3, width:"60%"}} > */}
                    <TextField onChange={(e) => setText(e.target.value)} style={{width:"90%",backgroundColor:"white"}} hiddenLabel fullWidth id="standard-basic" placeholder='Enter A Message' variant="standard"  />

                {/* </Grid> */}
                {/* <Grid item style={{flex:1,width:"40%"}}  > */}
                <Button style={{width:"10%"}}
                    onClick={() => {
                    alert('clicked');
                    }}
                >
                    SEND
                </Button>
                {/* </Grid> */}
            </Grid>
        </>
    )
}

export default UserChat;