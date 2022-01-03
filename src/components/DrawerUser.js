import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListContacts from './ListContacts';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const DrawerUser = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [value, setValue] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);

    const handleChange = (event, newValue) => {
      console.log(newValue);
      setValue(newValue);
    };

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                { Object.keys(props.userActive).length == 0 ? <Skeleton /> : props.userActive.nickname}
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                { Object.keys(props.userActive).length == 0 ? <Skeleton /> : props.userActive.bio}
              </Typography>
            </Grid>
            <Grid item xs={1}>
                <Fab size="small" color="white" onClick={handleMenuClick} aria-label="add" sx={{ backgroundColor: "white", boxShadow: 0 }}>
                    <MoreVertIcon />
                </Fab>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleModalOpen}>Contacts</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
            </Grid>
        </Grid>
      </Toolbar>
      <Divider />
      <List>
        
        <ListItem button key="test">
            <ListItemIcon>
              <Avatar sx={{ bgcolor: "#FF7878" }}>DY</Avatar>
            </ListItemIcon>
            <Grid container direction="column">
              <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
                Dave Yonathan
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Lorem Ipsum dolor sit ame...
              </Typography>
            </Grid>
          </ListItem>
      </List>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={modalStyle}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="My Contacts" />
              <Tab label="Search User" />
            </Tabs>
            {(value == 0) && <ListContacts />}
            {(value == 1) && <Typography>Tab 2</Typography>}
          </Box>
        </Fade>
      </Modal>
    </div>
    )
  };

  export default DrawerUser;