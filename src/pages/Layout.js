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

const drawerWidth = 350;

const fabStyle = {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: "#FF7878"
}

const Layout = (props) => {
  const { window } = props;
  const [ mobileOpen, setMobileOpen ] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Grid container>
            <Grid item xs={2}>
                <Avatar sx={{ bgcolor: "#FF7878" }}>DS</Avatar>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
                    Denny Susastro
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    Hey there i'm using chat in
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
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
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