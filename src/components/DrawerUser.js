import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const DrawerUser = (props) => {
    //navbar
    return (
    <div>
      <Toolbar>
        <Grid container>
            <Grid item xs={2}>
                <Avatar sx={{ bgcolor: "#FF7878" }}>DS</Avatar>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
                    {props.userActive.nickname}
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {props.userActive.bio}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Fab size="small" color="white" aria-label="add" sx={{ backgroundColor: "white", boxShadow: 0 }}>
                    <MoreVertIcon />
                </Fab>
            </Grid>
        </Grid>
      </Toolbar>
      <Divider />
      <List>
        
        <ListItem button key="test">
            <ListItemIcon>
              <Avatar sx={{ bgcolor: "#FF7878" }}>DY</Avatar>
            </ListItemIcon>
            <Grid direction="column">
              <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
                Dave Yonathan
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Lorem Ipsum dolor sit ame...
              </Typography>
            </Grid>
          </ListItem>
      </List>
    </div>
    )
  };

  export default DrawerUser;