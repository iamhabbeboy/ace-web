import { Button, Container, Grid, Group, Input, rem } from '@mantine/core';
import { IconAt, IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { createUser } from '../store/thunks/user';
import { useState } from 'react';

interface Error {
  message: string;
}

const HomePage = () => {
  const [userId, setUserId] = useState("");
  return (
    <Container size="xs" px="xs">
      <div>
        <h1 className='text-5xl'>Welcome to aceTest</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab pariatur nisi quia harum aut? Pariatur porro blanditiis dignissimos, non totam veniam!</p>
        <Grid>
          <Grid.Col span={8}>
            <Input
              icon={<IconAt />}
              placeholder="Your user ID"
              defaultValue={"12345"}
              onChange={(e) => setUserId(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <SignInButton userId={userId} />
          </Grid.Col>
        </Grid>

      </div>
    </Container>
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
      <span style={{color: "#993300"}}>{error}</span>
    </Group>
  );
}

export default HomePage