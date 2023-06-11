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
  body: {
    background: '#0c8afe',
    height: '100vh',
  },
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

const SignInPage = () => {
  const { classes } = useStyles();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });



  const handleDefaultLogin = () => {
  }
  return (
    <div className={classes.body}>
      <Container size="xs" px="xs" pt="lg">
        <Card withBorder radius="md" className={classes.card}>
          <h4 style={{ color: '#666' }}><IconBook size={rem(90)} /></h4>
          <h3>Welcome back.</h3>
          <p>New Here? <UnstyledButton onClick={() => login()} className={classes.link}>Create Account</UnstyledButton></p>
          {/* <SignInButton userId={userId} /> */}
          {/* <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          /> */}
          <button
            className={styles.GoogleButton}
            onClick={() => login()}
          >
            <img
              src={googleIcon}
              alt="Google Icon"
              width={24}
              height={24}
            />{" "}
            <span>Sign In with Google</span>
          </button>
          <p></p>
        </Card>
      </Container>
    </div>
  )
}

function SignInButton({ userId }: { userId: string }) {
  const navigation = useNavigate()
  const [error, setError] = useState("")

  const handleUserLogin = async () => {
    if (userId === "") {
      return alert("User ID is required");
    }
    const result = await store.dispatch(createUser({
      first_name: "Abiodun",
      last_name: "Azeez",
      id: "",
      avatar: '',
      oauth_user_id: userId,
      email: 'iamhabbeboy@gmail.com',
    }));

    if (result.meta.requestStatus === "fulfilled") {
      navigation('/onboarding/account')
      return;
    }

    if (result.meta.requestStatus === "rejected") {
      const msg = result.payload as Error;
      setError(msg.message);
    }
  }

  return (
    <Group position="left">
      <Button
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        leftIcon={<IconBrandGoogle size={rem(18)} />}
        variant="default"
        onClick={handleUserLogin}
      >
        Sign In With Google
      </Button>
      <span style={{ color: "#993300" }}>{error}</span>
    </Group>
  );
}

export default SignInPage