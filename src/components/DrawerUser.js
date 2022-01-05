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
import SearchUser from './SearchUser';
import Skeleton from '@mui/material/Skeleton';
import { UserContext } from '../config/UserContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import { render } from '@testing-library/react';
import { updateDoc, doc } from 'firebase/firestore/lite';
import { fire } from '../config/firebase';
import Button from '@mui/material/Button';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  height: 600,
  overflow: 'scroll'
};

const DrawerUser = (props) => {
    const { userActive, setUser, room, setRoom } = React.useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [value, setValue] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [editingProfile, setEditingProfile] = React.useState(false);
    const [openModalProfile, setOpenModalProfile] = React.useState(false);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
    const handleOpenModalProfile= () => setOpenModalProfile(true);
    const handleCloseModalProfile= () => setOpenModalProfile(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteContact = async (id) => {
      const newContacts = [];
      userActive.contacts.forEach(e => {
        if(e.id !== id){
          newContacts.push(e);
        }
      })

      const q = doc(fire, 'user', userActive.id);
      await updateDoc(q, {
        contacts: newContacts
      })

      setUser({
          id: userActive.id,
          username: userActive.username,
          firstname: userActive.firstname,
          lastname: userActive.lastname,
          password: userActive.password,
          bio: userActive.bio,
          contacts: newContacts
      })
    }

    const logoutHandler = ()=>{
        window.location = '/login'
    }
    const getAvatar = ()=>{
        return (userActive.firstname[0]).toUpperCase() + (userActive.lastname[0]).toUpperCase()
    }

    const toggleEdit = ()=> setEditingProfile(!editingProfile);
    function procesEditProfile(){
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let bio = document.getElementById('bio').value;


    }
    console.log(room);
    //navbar
    return (
    <div>
      <Toolbar>
         <Grid container>
            <Grid item xs={2}>
                <Avatar sx={{ bgcolor: "#FF7878" }}>{getAvatar()}</Avatar>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
                { Object.keys(userActive).length == 0 ? <Skeleton /> : userActive.firstname +' '+userActive.lastname}
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                { Object.keys(userActive).length == 0 ? <Skeleton /> : userActive.bio}
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
                  <MenuItem onClick={handleOpenModalProfile}>Profile</MenuItem>
                  <MenuItem onClick={()=>logoutHandler()}>Logout</MenuItem>
                </Menu>



            </Grid>
        </Grid>
      </Toolbar>
      <Divider />
      <List>
       {
         room.map((item,i)=>(
          <ListItem button key="test">
            <ListItemIcon>
              <Avatar sx={{ bgcolor: "#FF7878" }}>{item.firstname.substr(0,1)+item.lastname.substr(0,1)}</Avatar>
            </ListItemIcon>
            <Grid container direction="column">
              <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
                {item.firstname+" "+item.lastname}
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {item.chats.message}
              </Typography>
            </Grid>
          </ListItem>
         )
        )
       }
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
            {(value == 0) && <ListContacts deleteContact={deleteContact} />}
            {(value == 1) && <SearchUser />}
          </Box>
        </Fade>
      </Modal>

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalProfile}
            onClose={handleCloseModalProfile}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModalProfile}>
                <Box sx={modalStyle}>
                    <Fab size="small" color="white"  onClick={toggleEdit} aria-label="Edit" sx={{ backgroundColor: "white", boxShadow: 0 }}>
                        <ModeEditIcon />
                    </Fab>
                    <Box sx={{display:'flex' , alignItems:'center', justifyContent: 'space-between'}}>
                        <Avatar  sx={{ bgcolor: "#FF7878" }}>{getAvatar()}</Avatar>
                        <TextField disabled={!editingProfile}  id='firstName' label="First Name" variant="outlined"  defaultValue={userActive.firstname}style={{marginLeft:'20px'}} />
                        <TextField disabled={!editingProfile}  id="lastName" label="Last Name" variant="outlined" defaultValue={userActive.lastname} />
                    </Box>
                    <Box marginY={'10px'}>
                        <TextField disabled={!editingProfile}  fullWidth id="bio" label="Bio" variant="outlined" defaultValue={userActive.bio} />
                    </Box>
                    {editingProfile && <Button fullWidth onClick={()=>procesEditProfile()} variant="contained">Edit</Button> }

                </Box>

            </Fade>
        </Modal>
    </div>
    )
  };

  export default DrawerUser;