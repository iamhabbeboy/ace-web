import { Button, Container, Group, rem } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';

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
  return (
    <Group position="left">
      <Button
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/mantinedev"
        leftIcon={<IconBrandGoogle size={rem(18)} />}
        variant="default"
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