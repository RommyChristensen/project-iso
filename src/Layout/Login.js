import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {getFirestore, collection, getDocs, addDoc, query, doc, updateDoc, getDoc} from 'firebase/firestore/lite';
import { fire } from '../config/firebase';
import { UserContext } from '../config/UserContext';
import { useNavigate } from 'react-router-dom';
import getRoom from '../store/Service';

const Login = ()=>{

    // hooks
    const { setUser,setRoom ,setDoc } = React.useContext(UserContext);

    const navigate = useNavigate();

    // functions

    async function getAllUser(){
        const q = query(collection(fire, 'user'));
        const data =  await getDocs(q);

        // data.forEach(function async (doc) {
        //     // doc.data() is never undefined for query doc snapshots
        //     var user = doc.data();
        //     user['id'] = doc.id;
        //     listUser.push({
        //         user : user
        //     });
        // });
        // console.log(data.docs[0].id)
        // console.log(data.docs[0].data())
        return data.docs;
    }
    
    async function ceklogin(username, password) {
        let listUser = getAllUser();
        let valid =  false;
        let userOutput;
        (await listUser).forEach( function async (docs){
            // console.log(docs.data())
            let user = docs.data();
            if(user.username == username && password === user.password){
                valid = true;
                userOutput = docs;
                console.log(docs.data())
            }
        })

        if(valid) return userOutput;
        return valid;
    }
    async function  handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        let username = data.get('username')
        let password = data.get('password')
        let valid = await ceklogin(username,password);
        let rooms = await getRoom(username);
        if(valid !== false){
            let user = valid.data()
            user['id'] = valid.id
            setUser(user);
            setDoc(valid)
            console.log(valid)
            setRoom(rooms);
            console.log(rooms);
   
            setTimeout(() => {
                navigate('/home');
            }, 2000);
     

        }else{
            alert("Username atau password tidak ditemukan")
        }
    };


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
