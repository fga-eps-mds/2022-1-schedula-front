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

import { listcategory } from '@services/testApi';

type FormProps = {
  id: number;
  name: string;
  description: string;
};

interface ModalEditCategoryProps {
  id: number;
  name: string;
  description: string;
  callBackEdit: (novaCategoria: FormProps) => void;
}

export const ModalEditCategory = ({
  id,
  name,
  description,
  callBackEdit,
}: ModalEditCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<FormProps>({
    defaultValues: {
      name,
      description,
    },
  });

  const onEdit: SubmitHandler<FormProps> = async (data) => {
    data.id = id;
    listcategory
      .put('/users', JSON.stringify(data))
      .then(() => {
        toast.success(
          'A categoria ' + data.name + ' foi atualizada',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );
        callBackEdit(data);
      })
      .catch((error) => {
        toast.warning('Falha ao atualizar categoria!', {
          position: 'top-left',
          autoClose: 2000,
        });
        console.log(error);
      });
    reset();
    onClose();
  };

  return (
    <>
      <Box
        m='0 auto'
        mt='1em'
        fontSize={'xl'}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- Its hover.
        _hover={{ boxShadow: 'dark-lg' }}
        onClick={onOpen}
      >
        <BiEditAlt />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign={'center'}
            fontSize={'3xl'}
            fontFamily={'Overpass ,sans-serif'}
          >
            Editar Categoria de Problema
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
                  colorScheme=''
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
                  variant='ghost'
                  bg='primary'
                  color={'white'}
                  type='submit'
                  borderRadius={'50px'}
                  boxShadow={'dark-lg'}
                >
                  <Text fontSize={'smaller'}>
                    ATUALIZAR CATEGORIA DE<p></p> PROBLEMA
                  </Text>
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
