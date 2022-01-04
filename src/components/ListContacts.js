import { ListItem, Avatar, ListItemIcon, Typography, Grid, Box } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../config/UserContext';

const ListContacts = (props) => {
    const { userActive } = useContext(UserContext);

    const generateContacts = userActive.contacts.map(c => {
        return <ListItem button key={c.username}>
            <ListItemIcon>
            <Avatar sx={{ bgcolor: "#FF7878" }}>DY</Avatar>
            </ListItemIcon>
            <Grid container direction="column">
            <Typography variant="subtitle2" sx={{ marginLeft: 0.1, textStyle: "bold" }}>
                Dave Yonathan
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: 0.1 }}>
                Status...
            </Typography>
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