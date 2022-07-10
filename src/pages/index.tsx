import { Button, Center, Input } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

type formFields = {
  field1: string;
};

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<formFields>();
  const onSubmit: SubmitHandler<formFields> = (data) => {
    alert(JSON.stringify(data));
    toast.info('Form enviado');
  };
  return (
    <Center height='100vh'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          size='sm'
          w='sm'
          mr={2}
          placeholder='Field 1'
          {...register('field1')}
        />
        <Button
          colorScheme='twitter'
          size='sm'
          type='submit'>
          Projeto agenda
        </Button>
      </form>
    </Center>
  );
};

export default Home;
