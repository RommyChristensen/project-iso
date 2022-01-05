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
import Stack from '@mui/material/Stack';
import { useState,useEffect } from 'react';

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
      <Box component="main" >
        Test
        <TextField fullWidth label="fullWidth" id="fullWidth" />
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
