import { ListItem, Avatar, ListItemIcon, Typography, Grid, Box } from '@mui/material';

const ListContacts = (props) => {
    return (
        <>
            <Box sx={{ height: 10, width: 10 }}></Box>
            <ListItem button key="test">
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
            <ListItem button key="test">
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
        </>
    )
}

export default ListContacts;