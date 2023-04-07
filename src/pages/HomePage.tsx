import { Button, Container, Group, rem } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { createUser } from '../store/thunks/user';

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
    await store.dispatch(createUser({
      first_name: "Abiodun",
      last_name: "Azeez",
      id: '0000000000',
      avatar: '',
      oauth_user_id: '1234567890',
      email: 'iamhabbeboy@gmail.com',
      companies: [{
        name: "Bashlabs",
        logo: "https://bashlabs.com/wp-content/uploads/2020/09/cropped-BashLabs-Logo-1.png",
        description: "",
      }],
      username: '',
      password: '',
      created_at: '',
      updated_at: ''
    }));

    navigation('/home')
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