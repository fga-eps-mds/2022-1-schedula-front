import { Button, Text, useDisclosure } from '@chakra-ui/react';

import { CommonData } from './DataType';

interface ListagemButtonProps {
  buttonText: string;
  callBack: (item: CommonData) => void;
}

export const ListagemButton = ({
  buttonText,
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
      {/* <ModalCadType
        isOpen={isOpen}
        onClose={onClose}
        categoryId={2}
        callBack={callBack}
      /> */}
    </>
  );
};
