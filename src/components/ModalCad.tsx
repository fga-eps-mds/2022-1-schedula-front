import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export const ModalCad = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<formFields>();

  const [isError, setError] = useState(false);

  type formFields = {
    name: string;
    description: string;
    date: Date;
    active: boolean;
  };

  const onSubmit: SubmitHandler<formFields> = (data) => {
    data.date = new Date();
    data.active = true;

    if (data.name === '' || data.description === '') {
      setError(true);
    } else {
      toast(
        'A categoria ' + data.name + ' foi cadastrada',
        {
          position: 'top-left',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      reset();
    }
  };

  return (
    <>
      <Box fontFamily={'Overpass ,sans-serif'}>
        <Button
          bg={'primary'}
          color={'white'}
          margin={'0 auto'}
          boxShadow={'dark-lg'}
          marginTop={'1em'}
          borderRadius={'90px'}
          h={'2em'}
          onClick={onOpen}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          _hover={{
            color: 'white',
            bg: 'primary',
            boxShadow: 'xl',
          }}>
          <Text mt='0.25em' noOfLines={1}>
            NOVA CATEGORIA DE PROBLEMA
          </Text>
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Nova Categoria</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired isInvalid={isError}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder='Nome'
                    {...register('name')}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={isError}>
                  <FormLabel>Descrição</FormLabel>
                  <Input
                    placeholder='Descrição'
                    {...register('description')}
                  />
                </FormControl>

                <ModalFooter>
                  <Button
                    colorScheme=''
                    bg='InfoBackground'
                    color='black'
                    mr={3}
                    onClick={onClose}
                    border={'1px'}
                    borderColor={'black'}>
                    Cancelar
                  </Button>
                  <Button
                    variant='ghost'
                    bg='primary'
                    color={'white'}
                    type='submit'>
                    <Text>
                      REGISTRAR CATEGORIA DE<p></p> PROBLEMA
                    </Text>
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
