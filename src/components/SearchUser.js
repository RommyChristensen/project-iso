import { Box, TextField, CircularProgress, Typography, ListItem, ListItemIcon, Avatar, Grid, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from '../config/UserContext';

// firebase
import { query, collection, where, onSnapshot, getDocs, addDoc, orWhere, orderBy, startAt, endAt } from 'firebase/firestore/lite';
import { fire } from '../config/firebase';

const SearchUser = () => {
    const { userActive } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleKeyDown = async (key) => {
        if(key == "Enter"){
            setLoading(true);
            const q = query(collection(fire, 'user'), orderBy('username'), startAt(search), endAt(search+'\uf8ff'));
            const data = await getDocs(q);
            
            setLoading(false);
            generateContacts(data.docs);
        }
    }

    const handleAddContacts = (username) => {
        console.log(username);
    }

    const generateContacts = (data) => {
        if(data.length == 0) {
            setSearchResults([<Typography>No Users Found</Typography>]);
            return;
        }

        let result = [];
        data.forEach(d => {
            result.push(
                <ListItem button key={d.data().username}>
                    <ListItemIcon>
                    <Avatar sx={{ bgcolor: "#FF7878" }}>{d.data().firstname.substring(0,1)}{d.data().lastname.substring(0,1)}</Avatar>
                    </ListItemIcon>
                    <Grid container direction="column">
                    <Typography variant="subtitle2" sx={{ marginLeft: 0.1, textStyle: "bold" }}>
                        {d.data().firstname} {d.data().lastname}
                    </Typography>
                    <Button variant="outlined" size="small" onClick={() => handleAddContacts(d.data().username)}>Add Contacts</Button>
                    </Grid>
                </ListItem>
            );
        })
        setSearchResults(result);
    }

    return (
        <>
            <Box sx={{ height: 10, width: 10 }}></Box>
            <Box sx={{ position: "relative" }}>
                { loading && <CircularProgress sx={{ position: 'absolute', top: "40%", left: "48%" }} size={20}></CircularProgress> }
                <TextField disabled={loading} onKeyDown={e => handleKeyDown(e.key)} onChange={e => setSearch(e.target.value)} id="search-user" label="Search User" variant="outlined" fullWidth={true} margin="dense" />        
            </Box>

            {searchResults.map(d => {
                return d;
            })}
        </>
    )
}

export default SearchUser;