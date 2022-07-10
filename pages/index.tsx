import { Button, Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { toast } from 'react-toastify';

const Home: NextPage = () => {
  return (
    <Center height='100vh'>
      <Button
        colorScheme='telegram'
        size='lg'
        onClick={() => toast.info('Projeto agenda')}>
        Projeto agenda
      </Button>
    </Center>
  );
};

export default Home;
