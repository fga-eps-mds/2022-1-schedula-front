import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { AxiosInstance } from 'axios';

import { RequestDelProps } from '@components/DataType';
import { DelRequest } from '@services/RequestDel';

interface ModalDelProps {
  isOpen: boolean;
  modalHeader: string;
  api: AxiosInstance;
  errorMessage: string;
  successMessage: string;
  tag: string;
  id: number;
  name: string;
  fistText: string;
  secondText: string;
  onClose: () => void;
  callBack: (data: number) => void;
}

export const ModalDel = ({
  isOpen,
  api,
  errorMessage,
  successMessage,
  tag,
  id,
  name,
  onClose,
  callBack,
}: ModalDelProps) => {
  function Delete() {
    const requestBody: RequestDelProps = {
      id,
      api,
      errorMessage,
      successMessage,
      tag,
      callBack,
      onClose,
    };
    DelRequest(requestBody);
  }

  return (
    <>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={'auto'} backdropBlur={'2px'} />
        <ModalContent>
          <ModalHeader
            fontSize='xl'
            fontWeight='bold'
            m={'0 auto'}
            fontFamily={'Overpass ,sans-serif'}
            w='75%'
            textAlign={'justify'}
            mt='2%'
          >
            Você tem certeza que deseja apagar a cidade {name}?
          </ModalHeader>

          <ModalFooter
            fontFamily={'Overpass ,sans-serif'}
            justifyContent={'center'}
            mt={'30px'}
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
              CANCELAR
            </Button>
            <Button
              colorScheme='orange'
              bg={'primary'}
              onClick={Delete}
              ml={5}
              fontSize={'18px'}
              borderRadius={'50px'}
              maxH={'35px'}
              w={'250px'}
            >
              Apagar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
