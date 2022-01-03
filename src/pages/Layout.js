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
import { useState,useEffect } from 'react';
import { query, collection, where, onSnapshot, getDocs, addDoc, orWhere } from 'firebase/firestore/lite';
import { fire } from '../config/firebase';
import DrawerUser from '../components/DrawerUser';
const drawerWidth = 350;

const fabStyle = {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: "#FF7878"
}


const Layout = (props) => {
  
  const [userActive, setUserActive] = useState({});
  const [kontak, setKontak] = useState([{}]);
  const { window } = props;
  const [ mobileOpen, setMobileOpen ] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  function GetActive() {
    //yang dibutuhkan username dan harus unique
    useEffect(async() => {
      const q = query(collection(fire, 'user'), where('username',"==", 'denny'));
        const data =  await getDocs(q);
        data.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUserActive(doc.data());
         
        });
       // GetKontak();
    },[])
  }
  
  async function GetKontak() {
    //yang dibutuhkan username dan harus unique
   
        const q = query(collection(fire, 'user'));
        const data =  await getDocs(q);
        var kt=[];
        data.forEach(function async (doc) {
          // doc.data() is never undefined for query doc snapshots
            var dt = doc.data();
            var us;
            if(dt.invited_by==userActive.username){
              us = dt.invited_by;
            }
            else if(dt.invited_id==userActive.username){
              us = dt.invited_id;
            }
            kt.push({
              nama : us
            });
        });
        setKontak(kt);

  }
  
  {GetActive()}

  const listItems = kontak.map((number) =>
    <li></li>
  );


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
          <DrawerUser userActive={userActive}></DrawerUser>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerUser userActive={userActive}></DrawerUser>
            <Fab size="medium" color="secondary" aria-label="add" sx={fabStyle}>
                <AddIcon />
            </Fab>
        </Drawer>
      </Box>
      <Box component="main">
        Test
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