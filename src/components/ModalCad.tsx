import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
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

  type formFields = {
    name: string;
    description: string;
  };

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
                <Input
                  size='sm'
                  w='sm'
                  mr={2}
                  placeholder='Nome'
                  {...register('name')}
                />
                <Input
                  size='sm'
                  w='sm'
                  mr={2}
                  placeholder='Descrição'
                  {...register('description')}
                />
              </form>
            </ModalBody>

            <ModalFooter
              justifyContent={'center'}
              fontSize={'small'}
              onSubmit={handleSubmit(onSubmit)}>
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
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
