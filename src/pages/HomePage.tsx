import { Container } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/selectors';
import { useEffect } from 'react';

const HomePage = () => {
  const user = useSelector(selectUser)
  const navigation = useNavigate();
   useEffect(() => {
    // if(user.token !== '') {
      // window.location.href = "/home"
      // navigation("/home")
  //  }
   }, [user, navigation]);
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