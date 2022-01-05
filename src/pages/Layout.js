import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import DrawerUser from '../components/DrawerUser';
import { UserContext } from '../config/UserContext';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 350;
const Layout = (props) => {
   // hooks
  const { userActive,setUserActive } = React.useContext(UserContext);
  const navigate = useNavigate();
  const { window } = props;
  const [ mobileOpen, setMobileOpen ] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#FF7878"
        }}
      >
        <Toolbar>
            <Grid container>
                <Grid item sx={{ width: '4%' }}>
                    <Avatar sx={{ bgcolor: "#FFFFFF", color: "black" }}>DS</Avatar>
                </Grid>
                <Grid item sx={{ width: '86%' }}>
                    <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
                        Denny Susastro
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                        Hey there i'm using chat in
                    </Typography>
                </Grid>
                <Grid container item xs={1} justifyContent='flex-end' alignItems="right" sx={{ width: '10%' }}>
                    <Fab size="small" aria-label="add" sx={{ backgroundColor: "#FF7878", boxShadow: 0 }}>
                        <MoreVertIcon />
                    </Fab>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerUser ></DrawerUser>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerUser></DrawerUser>

        </Drawer>
      </Box>
      <Box style={{height:'auto',width:'90%' , backgroundColor:'lightgrey'}} component="main" >
          <Grid item style={{width:'90%',height:'700px',marginLeft:'10px', marginRight:'10px', backgroundColor:''}}>
            <Card style={{position:"absolute", top:"80px", float:"left"}} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
            </Card>
            <Card style={{position:"absolute", top:"120px", right:10}} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
            </Card>
            <Card style={{position:"absolute", top:"220px", right:10}} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item style={{width:"80%",position:"absolute",bottom:'10px',marginLeft:'10px', marginRight:'10px'}}>
              {/* <Grid item style={{flex:3, width:"60%"}} > */}
                  <TextField style={{width:"90%",backgroundColor:"white"}} hiddenLabel fullWidth id="standard-basic" placeholder='Enter A Message' variant="standard"  />

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

      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
