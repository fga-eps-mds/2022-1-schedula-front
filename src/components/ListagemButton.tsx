import { ReactNode } from 'react';
import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { AxiosInstance } from 'axios';

import { CommonData } from '@services/DataType';

import { ModalCadEdit } from './ModalCad&Edit';

interface ListagemButtonProps {
  buttonText: string;
  modalHeader: string;
  buttonModal: ReactNode;
  api: AxiosInstance;
  errorMessage: string;
  successMessage: string;
  tag: string;
  callBack: (data: CommonData) => void;
}

export const ListagemButton = ({
  buttonText,
  buttonModal,
  modalHeader,
  api,
  errorMessage,
  successMessage,
  tag,
  callBack,
}: ListagemButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        bg={'primary'}
        color={'white'}
        margin={'0 auto'}
        boxShadow={'dark-lg'}
        marginTop={'1em'}
        borderRadius={'90px'}
        h={'2em'}
        onClick={onOpen}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
        _hover={{
          color: 'white',
          bg: 'primary',
          boxShadow: 'xl',
        }}
      >
        <Text mt='0.25em' noOfLines={1}>
          {buttonText}
        </Text>
      </Button>
      <ModalCadEdit
        api={api}
        errorMessage={errorMessage}
        successMessage={successMessage}
        tag={tag}
        type='cad'
        buttonModal={buttonModal}
        isOpen={isOpen}
        onClose={onClose}
        modalHeader={modalHeader}
        callBack={callBack}
      />
    </>
  );
};
