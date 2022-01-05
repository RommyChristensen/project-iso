import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
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
import {updateDoc, doc, getDoc, collection, addDoc} from 'firebase/firestore/lite';
import { fire } from '../config/firebase';
import Button from '@mui/material/Button';
import getRoom from "../store/Service";
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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

const modalProfileStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};
const fabStyle = {
  position: 'absolute',
  right: 16,
  bottom: 16,
  backgroundColor: "#FF7878"
}

const DrawerUser = (props) => {
    const { userActive, setUser, room, setRoom ,activeDoc ,setDoc} = React.useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [value, setValue] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [editingProfile, setEditingProfile] = React.useState(false);
    const [openModalProfile, setOpenModalProfile] = React.useState(false);
    const [openModalNewRoom, setOpenModalNewRoom] = React.useState(false);
    const [selectContact, setSelectContact] = React.useState({});

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
    const handleOpenModalProfile= () => setOpenModalProfile(true);
    const handleCloseModalProfile= () => setOpenModalProfile(false);
    const handleOpenModalNewRoom= () => setOpenModalNewRoom(true);
    const handleCloseModalNewRoom= () => setOpenModalNewRoom(false);

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
    async function procesEditProfile(){
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let bio = document.getElementById('bio').value;

        const q = doc(fire, 'user', userActive.id);
        await updateDoc(q, {
            firstname :firstName ,
            lastname : lastName,
            bio : bio
        })
        const temp = await getDoc(q)
        console.log(temp);
        setDoc(temp)
        const user = temp.data();
        user['id'] = temp.id;
        setUser(user)
        setRoom(await getRoom(userActive.username));
        toggleEdit()
        alert("Success Editing")




    }
    
    const listRoom = ()=>{
      var list = [];
      console.log(room);
        room.forEach(item => {
          list.push(
          <ListItem button key="test">
            <ListItemIcon>
              { Object.keys(item).length == 0 ? <Skeleton variant="circular" /> : <Avatar sx={{ bgcolor: "#FF7878" }}>{item.fname[0].toUpperCase()+item.lname[0].toUpperCase()}</Avatar>}
            </ListItemIcon>
            <Grid container direction="column">
              <Typography variant="subtitle2" sx={{ marginLeft: 1, textStyle: "bold" }}>
              { Object.keys(item).length == 0 ? <Skeleton /> : item.fname+" "+item.lname}
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
              { Object.keys(item).length == 0 ? <Skeleton /> : item.chats[0].message}
              </Typography>
            </Grid>
          </ListItem>)
        });
        return list;
    };
    function chooseContact(item) {
         setSelectContact(item);
    }
    const listContact = ()=>{
      console.log(userActive.contacts);
      var list = [];
        userActive.contacts.forEach((item,index) => {
          console.log(cekRoom(item));
         if(cekRoom(item)==0){
            list.push(
              <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "#FF7878" }}>{item.username.substring(0,2).toUpperCase()}</Avatar>
                  </ListItemIcon>
                  <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="subtitle1" sx={{ marginLeft: 0.1, textStyle: "bold" }}>
                            {item.username}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ marginLeft: 0.1, textStyle: "bold" }}>
                            {item.bio}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControlLabel value="1" control={<Radio />} onClick={() =>chooseContact(item)} label="" />
                      </Grid>
                  </Grid>
              </ListItem>
            )
         }
         
         
        }); 
        return list;
    }
    function cekRoom(data) {
      var ada = 0;
      room.forEach(items => {
        if(data.username==items.user1||data.username==items.user2){
          ada=1;
        }
      });
      return ada;
    }
    async function  handleSubmit(event){
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      let chats = data.get('message');
      let newRoom = {
        "user1":userActive.username,
        "user2":selectContact.username,
        "chats":[
          {
            "from":userActive.username,
            "message":chats,
            "read":false,
            "sent_time":new Date().toLocaleString()
          }
        ]
      }
      const db = collection(fire, 'room');
      const res = await addDoc(db, newRoom);
      handleCloseModalNewRoom();
  };
    //navbar
    return (
    <div>
      <Toolbar>
         <Grid container>
            <Grid item xs={2}>
                <Avatar sx={{ bgcolor: "#FF7878" }}>{ Object.keys(userActive).length == 0 ? <Skeleton /> : getAvatar()}</Avatar>
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
         listRoom()
       }
      </List>
      <Fab size="medium" color="secondary" aria-label="add" sx={fabStyle}>
          <AddIcon onClick={handleOpenModalNewRoom} />
      </Fab>
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
                <Box sx={modalProfileStyle}>
                 
                </Box>

            </Fade>
        </Modal>
        
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalNewRoom}
            onClose={handleCloseModalNewRoom}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModalNewRoom}>
                <Box sx={modalProfileStyle} component="form" onSubmit={handleSubmit}>
                <Grid container style={{marginBottom:"20px"}}>
                    <Grid item xs={10}>
                      <TextField required defaultValue="Hai!" name="message" id="outlined-basic" label="Message" variant="outlined" autoFocus style={{width:"100%"}} />
                    </Grid>
                    <Grid item xs={2} style={{paddingLeft:"5px",paddingRight:"5px"}} >
                      <Button type='submit' variant="outlined" style={{width:"100%",height:"50px"}}><SendIcon></SendIcon></Button>
                    </Grid>
                </Grid>
                <Typography variant="h6" component="h6" style={{marginBottom:"10px"}}>
                  Choose Friend
                </Typography>
                <RadioGroup
                    name="radio-buttons-group"
                  >
                  {listContact()}
                  </RadioGroup>
                 </Box>
            </Fade>
        </Modal>
    </div>
    )
  };

  export default DrawerUser;