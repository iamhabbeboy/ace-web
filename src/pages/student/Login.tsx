import { Button, Container, Input, PasswordInput, Text, createStyles } from "@mantine/core"
import { IconAsterisk, IconChevronRight, IconUser } from "@tabler/icons-react";

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
    return (
        <Container size={"xs"}>
            <br /><br /><br />
            <div className={classes.section}>
                <h1>Login</h1>
                <Text>Username</Text>
                <Input icon={<IconUser />} size="lg" />
                <Text mt={5}>Password</Text>
                {/* <Input icon={<IconAsterisk />} size="lg" /> */}
                <PasswordInput
                icon={<IconAsterisk />}
                    placeholder="Password"
                    withAsterisk
                    size="lg"
                />
                <Button mt={15} size="lg" color="indigo" fullWidth>Login <IconChevronRight /></Button>
            </div>
        </Container>
    )
}

export default Login