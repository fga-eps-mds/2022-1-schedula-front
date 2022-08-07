import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { AxiosInstance } from 'axios';

import { RequestDelProps } from '@services/DataType';
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
  modalHeader,
  api,
  errorMessage,
  successMessage,
  tag,
  id,
  name,
  fistText,
  secondText,
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
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={'auto'} backdropBlur={'2px'} />
        <ModalContent>
          <ModalHeader
            fontSize='3xl'
            fontWeight='bold'
            m={'0 auto'}
            fontFamily={'Overpass ,sans-serif'}
          >
            {modalHeader}
          </ModalHeader>

          <ModalBody>
            <Text
              w='60%'
              m={'0 auto'}
              textAlign={'justify'}
              fontSize={'md'}
              fontFamily={'Overpass ,sans-serif'}
            >
              Você está prestes a remover {fistText}
              {' ' + name + ' '} {secondText}. Tem certeza disso?
            </Text>
          </ModalBody>

          <ModalFooter
            fontFamily={'Overpass ,sans-serif'}
            justifyContent={'center'}
            mt={'30px'}
          >
            <Button
              colorScheme='green'
              bg={'#22A122'}
              onClick={onClose}
              fontSize={'md'}
              borderRadius={'50px'}
              maxH={'35px'}
              w={'190px'}
            >
              CANCELAR
            </Button>
            <Button
              colorScheme='red'
              bg={'#DE4040'}
              onClick={Delete}
              ml={5}
              fontSize={'18px'}
              borderRadius={'50px'}
              maxH={'35px'}
              w={'250px'}
            >
              SIM, TENHO CERTEZA
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
