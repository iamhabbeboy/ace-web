import { Button, Container, Group, rem } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { createUser, getUser } from '../store/thunks/user';

const HomePage = () => {
  return (
    <Container>
      <div className='w-5/12 mx-auto'>
        <h1 className='text-5xl'>Welcome to aceTest</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab pariatur nisi quia harum aut? Pariatur porro blanditiis dignissimos, non totam veniam!</p>
        <SignInButton />
      </div>
    </Container>
  )
}

function SignInButton() {
  const navigation = useNavigate()
  const handleUserLogin = async () => {
    navigation('/home')
    // const result = await store.dispatch(getUser({id: '123'}));
    // console.log(result)
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
      <Button
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/mantinedev"
        leftIcon={<IconBrandGoogle size={rem(18)} />}
        variant="default"
      >
        Sign Up With Google
      </Button>
    </Group>
  );
}

export default HomePage