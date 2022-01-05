import { ListItem, Avatar, ListItemIcon, Typography, Grid, Box, IconButton, CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from '../config/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';

const ListContacts = ({ deleteContact }) => {
    const { userActive } = useContext(UserContext);
    const [ loading, setLoading ] = useState(false);

    const handleDeleteContact = async (id) => {
        console.log(id);
        setLoading(true);
        await deleteContact(id);
        setLoading(false);
    } 

    const generateContacts = userActive.contacts.map(c => {
        return <ListItem button key={c.username}>
            <ListItemIcon>
            <Avatar sx={{ bgcolor: "#FF7878" }}>{c.username.substring(0,1)}</Avatar>
            </ListItemIcon>
            <Grid container direction="column">
            <Typography variant="subtitle2" sx={{ marginLeft: 0.1, textStyle: "bold" }}>
                {c.username}
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: 0.1 }}>
                {c.bio}
            </Typography>
            </Grid>
            <Grid>
                <IconButton variant="contained" size="small" onClick={async () => await handleDeleteContact(c.id)} disabled={loading}>
                    { loading && <CircularProgress size={30} sx={{ position: 'absolute' }} />  }
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </ListItem>
    });

    return (
        <>
            <Box sx={{ height: 10, width: 10 }}></Box>
            { generateContacts }
        </>
    )
}

export default ListContacts;