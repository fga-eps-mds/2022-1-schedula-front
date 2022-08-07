import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
} from '@chakra-ui/react';
import { AxiosInstance } from 'axios';

import { CadRequest } from '@services/RequestCad';

import { CommonData, RequestProps } from '../services/DataType';
import { EditRequest } from '../services/RequestEdit';

interface ModalCadEditProps {
  isOpen: boolean;
  modalHeader: string;
  buttonModal: ReactNode;
  type: string;
  api: AxiosInstance;
  errorMessage: string;
  successMessage: string;
  tag: string;
  id?: number;
  name?: string;
  description?: string;
  onClose: () => void;
  callBack: (data: CommonData) => void;
}

export const ModalCadEdit = ({
  isOpen,
  modalHeader,
  buttonModal,
  type,
  api,
  errorMessage,
  successMessage,
  tag,
  id,
  name,
  description,
  onClose,
  callBack,
}: ModalCadEditProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<CommonData>({
    defaultValues: {
      name,
      description,
    },
  });

  const onSubmit: SubmitHandler<CommonData> = async (data) => {
    data.id = id !== undefined ? id : data.id;
    const requestBody: RequestProps = {
      data,
      api,
      errorMessage,
      successMessage,
      tag,
      reset,
      callBack,
    };

    switch (type) {
      case 'cad':
        CadRequest(requestBody);
        break;

      case 'edit':
        EditRequest(requestBody);
        break;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay backdropFilter={'auto'} backdropBlur={'2px'} />
        <ModalContent>
          <ModalBody>
            <ModalHeader
              textAlign={'center'}
              fontSize={'3xl'}
              fontFamily={'Overpass ,sans-serif'}
            >
              {modalHeader}
            </ModalHeader>

            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
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

                <ModalFooter justifyContent={'center'} mt={'60px'}>
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
                    <Text fontSize={'smaller'}>{buttonModal}</Text>
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
