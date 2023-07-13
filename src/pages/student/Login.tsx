import { Button, Container, Input, PasswordInput, Text, createStyles } from "@mantine/core"
import { showNotification } from "@mantine/notifications";
import { IconAsterisk, IconChevronRight, IconUser, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Axios } from "../../util/axios.lib";
import axios, { AxiosError } from "axios";
import { IUser } from "../../types/Type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/collections/user";

const useStyles = createStyles((theme) => ({
    section: {
        background: '#FFF',
        padding: theme.spacing.xl,
        paddingBottom: '50px',
        borderRadius: theme.radius.md,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        'input': {
            color: '#666'
        }
    }
}));
const Login = () => {
    const { classes } = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const router = useNavigate()
    const dispatch = useDispatch();
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const payload = { username, password };
            const host = process.env.REACT_APP_API_URI || "http://localhost:9200";
            const { data } = await axios.post<IUser>(`${host}/api/student_signin`, payload);
            if(data) {
                const token = data.token;
                await dispatch(setUser(data));
                localStorage.setItem("acetest_portal_token", token);
                return router("/overview")
            }
        } catch (err: any) {
            const code = err.response.status;
            showNotification({
                title: 'Error Occured',
                message: code === 404 ? 'Invalid information': 'Error occured, please try again',
                color: 'red',
                icon: <IconX />
            });
            return err;
        }
    }

    return (
        <Container size={"xs"}>
            <br /><br /><br />
            <div className={classes.section}>
                <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <Text>Username</Text>
                <Input icon={<IconUser />} size="lg" onChange={(e) => setUsername(e.target.value)} required/>
                <Text mt={5}>Password</Text>
                <PasswordInput
                    icon={<IconAsterisk />}
                    placeholder="Password"
                    withAsterisk
                    size="lg"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button mt={15} size="lg" color="indigo" fullWidth type="submit">Login <IconChevronRight /></Button>
                </form>
            </div>
        </Container>
    )
}

export default Login