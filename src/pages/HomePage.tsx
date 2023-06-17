import { Container } from '@mantine/core';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Container size="xs" px="xs" pt="lg">
        <h1>Welcome to homepage</h1>
        <Link to="/signin">Click here to login</Link>
      </Container>
    </div>
  )
}

export default HomePage