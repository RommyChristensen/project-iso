
import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Nav = ()=>{
    return (
        <div>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
        </div>
    )
}

export  default  Nav;