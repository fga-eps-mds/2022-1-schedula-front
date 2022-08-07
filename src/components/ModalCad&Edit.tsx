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

import { CadRequestProps, CommonData } from '../services/DataType';

import { CadRequest } from './CadRequest';

interface ModalCadEditProps {
  isOpen: boolean;
  modalHeader: string;
  buttonModal: ReactNode;
  type: string;
  api: AxiosInstance;
  errorMessage: string;
  successMessage: string;
  tag: string;
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
  onClose,
  callBack,
}: ModalCadEditProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<CommonData>();

  const onSubmit: SubmitHandler<CommonData> = async (data) => {
    switch (type) {
      case 'cad':
        const requestBody: CadRequestProps = {
          data,
          api,
          errorMessage,
          successMessage,
          tag,
          reset,
          callBack,
        };
        requestBody.data = data;
        CadRequest(requestBody);
        break;

      case 'edit':
        return <></>;

      default:
        return <></>;
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
