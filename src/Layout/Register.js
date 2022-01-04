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
import { CircularProgress } from '@mui/material';
import Toastify from 'toastify-js';

// firebase
import { query, collection, where, onSnapshot, getDocs, addDoc, orWhere } from 'firebase/firestore/lite';
import { fire } from '../config/firebase';

// style
import "toastify-js/src/toastify.css";
import { useNavigate } from 'react-router-dom';

// context
import { UserContext } from '../config/UserContext';

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

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const { setUser } = React.useContext(UserContext);
    const [submitForm, setSubmitForm] = React.useState(false);

    const checkUsername = async (username) => {
        const q = query(collection(fire, 'user'), where('username', '==', username));
        const data = await getDocs(q);

        if(data.docs.length > 0){
            return false;
        }

        return true;
    }

    const insertNewUser = async (firstname, lastname, password, username, bio) => {
        const user = {
            firstname, lastname, password, username, bio, contacts: []
        };
        const db = collection(fire, 'user');
        const res = await addDoc(db, user);

        setUser(user);

        return res;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitForm(true);

        const firstname = data.get('firstName');
        const lastname = data.get('lastName');
        const password = data.get('password');
        const username = data.get('username');
        const bio = "I am using Chat In";
        
        if(firstname == '' || lastname == '' || password == '' || username == ''){
            Toastify({
                text: "All Field is required",
                duration: 1000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#FF7171",
                }
            }).showToast();

            setSubmitForm(false);
            return;
        }
        
        if(await checkUsername(data.get('username'))){
            await insertNewUser(firstname, lastname, password, username,bio);
            navigate('/home', { replace: true });
        }else{
            Toastify({
                text: "Username already been used",
                duration: 1000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#FF7171",
                }
            }).showToast();
        }
        setSubmitForm(false);
    };

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
                    <Avatar sx={{ m: 1, bgcolor: "#FF7878" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={submitForm}
                            color="success"
                        >
                            {
                                submitForm && 
                                <CircularProgress
                                    size={15}
                                    sx={{
                                        position: 'absolute'
                                    }}
                                />
                            }
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/*<Copyright sx={{ mt: 5 }} />*/}
            </Container>
        </ThemeProvider>
    );
}