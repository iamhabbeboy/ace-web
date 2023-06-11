import { Button, Card, Container, Grid, Group, Input, rem, createStyles, UnstyledButton } from '@mantine/core';
import { IconAt, IconBook, IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { createUser } from '../store/thunks/user';
import { useState } from 'react';
import googleIcon from "../assets/google.svg"
import styles from "../styles/Homepage.module.css";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

interface Error {
  message: string;
}

const useStyles = createStyles((theme) => ({
  footer: {
    color: '#666',
    fontSize: '12px'
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    // backgroundColor: theme.colors.blue,
    textAlign: 'center',
    width: '80%',
    margin: '40px auto',
  },
  link: {
    color: '#0c8afe',
    fontWeight: 'bold'
  },
}));

const HomePage = () => {
  const { classes } = useStyles();

  return (
    <div>
      <Container size="xs" px="xs" pt="lg">
        <h1>Welcome to homepage</h1>
      </Container>
    </div>
  )
}

export default HomePage