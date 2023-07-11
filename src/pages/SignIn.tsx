import { Card, Container, Group, rem, createStyles, UnstyledButton } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { createGoogleOauthUser } from '../store/thunks/user';
import googleIcon from "../assets/google.svg"
import styles from "../styles/Homepage.module.css";
import { useGoogleLogin } from '@react-oauth/google';
import { IGoogleOauth } from '../types/Type';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/collections/user';
import { selectUser } from '../store/selectors';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
    body: {
        background: '#0c8afe',
        height: '100vh',
    },
    footer: {
        color: '#666',
        fontSize: '12px'
    },
    error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        borderRadius: '3px',
        padding: '5px'
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
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch();

    const handleAuthentication = async (token: IGoogleOauth) => {
        const response = await createGoogleOauthUser(token)
        const result = await dispatch(setUser(response));
        if(!result.payload.id) {
            setError("Error occured while processing user information, please try again later.");
            return;
        }
        localStorage.setItem("oauth_token", result.payload.token);
        if(result.payload.onboarding) {
            return window.location.href = "/home";
            // return navigation('/home')
        }
        return navigation('/onboarding/account');
    }

    const login = useGoogleLogin({
        onSuccess: tokenResponse => handleAuthentication(tokenResponse),
    });

    const user = useSelector(selectUser)
    // useEffect(() => {
    //   if(user.token) {
    //     window.location.href = "/home"
    //   }
    // }, [user]);

    return (
        <div className={classes.body}>
            <Container size="xs" px="xs" pt="lg">
                <Card withBorder radius="md" className={classes.card}>
                    <h4 style={{ color: '#666' }}><IconBook size={rem(90)} /></h4>
                    <h3>Welcome back.</h3>
                    {error && <Group position="center" className={classes.error}>{error}</Group> }
                    <p>New Here? <UnstyledButton onClick={() => login()} className={classes.link}>Create Account</UnstyledButton></p>
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

export default SignInPage