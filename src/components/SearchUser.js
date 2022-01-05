import { Box, TextField, CircularProgress, Typography, ListItem, ListItemIcon, Avatar, Grid, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from '../config/UserContext';

// firebase
import { query, collection, where, onSnapshot, getDocs, addDoc, orWhere, orderBy, startAt, endAt, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { fire } from '../config/firebase';

const SearchUser = () => {
    const { userActive, setUser } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [usernames, setUsernames] = useState(userActive.contacts.length > 0 ? userActive.contacts.map(e => { return e.username }) : []);

    const handleKeyDown = async (key) => {
        if(key == "Enter"){
            setLoading(true);
            const q = query(collection(fire, 'user'), orderBy('username'), startAt(search), endAt(search+'\uf8ff'));
            const data = await getDocs(q);
            
            setLoading(false);
            generateContacts(data.docs);
        }
    }

    const handleAddContacts = async (username, idx) => {
        const q = query(collection(fire, 'user'), where('username', '==', username));
        const data = await getDocs(q);

        const user = data.docs[0].data();

        const q2 = doc(fire, 'user', userActive.id);

        let contacts = userActive.contacts.map(u => {
            return u;
        });

        contacts.push({
            id: data.docs[0].id,
            username: user.username,
            bio: user.bio
        })

        await updateDoc(q2, {
            contacts
        });

        setUser({
            id: userActive.id,
            username: userActive.username,
            firstname: userActive.firstname,
            lastname: userActive.lastname,
            password: userActive.password,
            bio: userActive.bio,
            contacts: contacts
        })

        setUsernames([...usernames, user.username]);
    }

    const generateContacts = (data) => {
        setUsernames(userActive.contacts.map(e => {
            return e.username;
        }))

        if(data.length == 0) {
            setSearchResults([<Typography>No Users Found</Typography>]);
            return;
        } else {
            const dResult = data.map(d => d.data());
            setSearchResults(dResult);
        }
    }

    return (
        <div>
            <Box sx={{ height: 10, width: 10 }}></Box>
            <Box sx={{ position: "relative" }}>
                { loading && <CircularProgress sx={{ position: 'absolute', top: "40%", left: "48%" }} size={20}></CircularProgress> }
                <TextField disabled={loading} onKeyDown={e => handleKeyDown(e.key)} onChange={e => setSearch(e.target.value)} id="search-user" label="Search User" variant="outlined" fullWidth={true} margin="dense" />        
            </Box>

            {
                searchResults.map((d, idx) => {
                    if(usernames.includes(d.username) == false){
                        return <ListItem button key={d.username}>
                            <ListItemIcon>
                            <Avatar sx={{ bgcolor: "#FF7878" }}>{d.firstname.substring(0,1)}{d.lastname.substring(0,1)}</Avatar>
                            </ListItemIcon>
                            <Grid container direction="column">
                            <Typography variant="subtitle2" sx={{ marginLeft: 0.1, textStyle: "bold" }}>
                                {d.firstname} {d.lastname}
                            </Typography>
                            <Button variant="outlined" size="small" onClick={() => handleAddContacts(d.username, idx)}>Add Contacts</Button>
                            </Grid>
                        </ListItem>
                    }
                })
            }
        </div>
    )
}

export default SearchUser;