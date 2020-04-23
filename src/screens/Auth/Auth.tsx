import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Container,
} from '@material-ui/core';
import { Link as RouteLink, Redirect } from 'wouter';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';

import { BigButton } from '../../components/BigButton';
import { LS, LSKeys } from '../../utils/LS';
import { authSelector } from '../../features/auth/authSlice';
import { AuthPayload, AuthType, makeRequest } from './helpers';
import { Routes } from '../../constants';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  },
  logo: {
    width: '100%',
  },
});

export const Auth = () => {
  const classes = useStyles();

  const isAuthed = useSelector(authSelector.isAuthed);
  const [pending, setPending] = useState(false);
  const [register, setRegister] = useState(false);
  const [data, setDataInt] = useState({
    login: '',
    email: '',
    pwd: '',
  });
  const [error, setError] = useState<string>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.login || !data.pwd || (register && !data.email)) {
      setError('Login and password required');
      return;
    }
    setPending(true);
    makeRequest(register ? AuthType.register : AuthType.login, data).catch(
      e => {
        setError(e.response.data);
        setPending(false);
      }
    );
  };
  const setData = (newData: Partial<AuthPayload>) =>
    setDataInt(data => ({ ...data, ...newData }));

  if (isAuthed) {
    const redirect = LS.get(LSKeys.redirect, true);
    LS.remove(LSKeys.redirect);
    return <Redirect to={redirect || '/'} />;
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <Grid
        alignItems="center"
        className={classes.root}
        container
        justify="center"
      >
        <Grid item md={4} xs={12}>
          <RouteLink href={Routes.lobby}>
            <a>
              <img
                alt="Poker bay logo"
                className={classes.logo}
                src={`${process.env.PUBLIC_URL}/pokerBay1.png`}
              />
            </a>
          </RouteLink>
          {Boolean(error) && <Alert severity="error">{error}</Alert>}
          <form method="post" onSubmit={onSubmit}>
            {register && (
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                onChange={({ target: { value } }) => setData({ email: value })}
                type="email"
                value={data.email}
                variant="outlined"
              />
            )}
            <TextField
              fullWidth
              label="Login"
              margin="normal"
              onChange={({ target: { value } }) => setData({ login: value })}
              value={data.login}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              onChange={({ target: { value } }) => setData({ pwd: value })}
              value={data.pwd}
              variant="outlined"
            />
            <Box mt={2}>
              <BigButton disabled={pending} type="submit">
                {pending ? (
                  <CircularProgress color="secondary" size={27} />
                ) : register ? (
                  'Register'
                ) : (
                  'Log in'
                )}
              </BigButton>
            </Box>
          </form>

          <Box mt={1} textAlign="center">
            <Link
              align="center"
              color="primary"
              component="button"
              onClick={() => setRegister(!register)}
            >
              {register ? 'Log in' : 'Register'}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
