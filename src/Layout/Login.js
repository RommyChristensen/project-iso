import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {getFirestore, collection, getDocs, addDoc, query} from 'firebase/firestore/lite';
import { fire } from '../config/firebase';

function addChat() {
    const chat = {
        "Dari" : "Denny",
        "Pesan" : "testing"
    };
    const db = collection(fire, 'chat');
    addDoc(db,chat);
}
async function getAllUser(){
    const q = query(collection(fire, 'user'));
    const data =  await getDocs(q);
    var listUser=[];
    data.forEach(function async (doc) {
        // doc.data() is never undefined for query doc snapshots
        var user = doc.data();
        listUser.push({
            user : user
        });
    });
    return listUser;
}

async function ceklogin(username, password) {

    let listUser = getAllUser();

    (await listUser).forEach(function (user){
        console.log(user)
        if(user.username == username && password == user.password){

            return true
        }
    })
    return false
}


const theme = createTheme();

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

async function  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let  username=  data.get('username')
    let  password=  data.get('password')

    if(ceklogin(username,password)){
        console.log('masok')
    }else{
        console.log('gagal')
    }

    // console.log(ceklogin(username, password))
};


const Login = ()=>{

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
            </Container>
        </ThemeProvider>
    );
}



export default Login;
