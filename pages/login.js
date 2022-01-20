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

import Router from 'next/router';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import loginChecker from '../src/loginChecker';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        TTU
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  var server = require('../host.json');
  var host = server.auth;

  var [loginError, setLoginError] = useState(false);
  var [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    var res = loginChecker();
    setIsLoggedIn(res);
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    // eslint-disable-next-line no-console
    // console.log({
    //   email,
    //   password
    // });

    const res = await axios.get(`${host}/user_profile/verify_identity?userName=${email}&password=${password}`)
    if (res.status === 204) {
      setLoginError(true);
    } else {
      var { userName, role, nid } = res.data;
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('userName', userName);
      localStorage.setItem('role', role);
      localStorage.setItem('nid', nid);

      setLoginError(false);
      Router.push({
        pathname: '/dashboard',
        query: {
          userName, role
        }
      })
    }
  };

  if (!isLoggedIn) {

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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me (doesn't work)"
              />
              {loginError === true && <Alert severity="error">Credentials mismatch!</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  } else {
    Router.push({
      pathname: '/dashboard'
    })
    return <>Checking..</>
  }
}