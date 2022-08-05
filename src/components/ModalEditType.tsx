import { SubmitHandler, useForm } from 'react-hook-form';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { typeApi } from '@services/testApi';

import { DataProbType } from './DataType';

interface ModalCadTypeProps {
  callBack: (novoTipo: DataProbType) => void;
  categoryId: number;
  id: number;
}

export const ModalEditType = ({
  categoryId,
  id,
  callBack,
}: ModalCadTypeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<DataProbType>();

  const onEdit: SubmitHandler<DataProbType> = async (
    data
  ) => {
    data.id = id;
    data.category_id = categoryId;
    data.active = true;
    typeApi
      .put('/users/' + data.id, data)
      .then(() => {
        toast.success(
          'O tipo ' +
            data.name +
            ' foi atualizado com sucesso',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );
        callBack(data);
        reset();
        onClose();
      })
      .catch(() => {
        toast.warning(
          'Falha ao atualizar tipo de problema',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );
      });
  };

  return (
    <>
      <Box fontFamily={'Overpass ,sans-serif'}>
        <Box
          m='0 auto'
          mt='1em'
          maxH={'20px'}
          maxW={'20px'}
          fontSize={'xl'}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- Its hover.
          _hover={{ boxShadow: 'dark-lg' }}
          onClick={onOpen}
        >
          <BiEditAlt />
        </Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'xl'}
        >
          <ModalOverlay
            backdropFilter={'auto'}
            backdropBlur={'2px'}
          />
          <ModalContent>
            <ModalHeader
              textAlign={'center'}
              fontSize={'3xl'}
              fontFamily={'Overpass ,sans-serif'}
            >
              Editar Tipo de Problema
            </ModalHeader>

            <ModalBody fontFamily={'Overpass ,sans-serif'}>
              <form onSubmit={handleSubmit(onEdit)}>
                <Box w={'50%'} m={'0 auto'}>
                  <FormControl isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      borderRadius={'8px'}
                      size={'sm'}
                      placeholder='Nome'
                      {...register('name')}
                    />
                  </FormControl>

                  <FormControl mt={'24px'}>
                    <FormLabel>Descrição</FormLabel>
                    <Input
                      borderRadius={'8px'}
                      size={'sm'}
                      placeholder='Descrição'
                      {...register('description')}
                    />
                  </FormControl>
                </Box>

                <ModalFooter
                  justifyContent={'center'}
                  mt={'60px'}
                >
                  <Button
                    variant={'solid'}
                    bg='InfoBackground'
                    color='black'
                    mr={'30px'}
                    onClick={onClose}
                    border={'1px'}
                    borderColor={'black'}
                    borderRadius={'50px'}
                    fontSize={'medium'}
                  >
                    Cancelar
                  </Button>
                  <Button
                    colorScheme={'orange'}
                    bg='primary'
                    color={'white'}
                    type='submit'
                    borderRadius={'50px'}
                    boxShadow={'dark-lg'}
                  >
                    <Text fontSize={'smaller'}>
                      ATUALIZAR TIPO DE<p></p> PROBLEMA
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
