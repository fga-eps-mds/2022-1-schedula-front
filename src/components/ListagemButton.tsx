import { ReactNode } from 'react';
import { Button, Text } from '@chakra-ui/react';

interface ListagemButtonProps {
  buttonText: string;
  onOpen: () => void;
  children?: ReactNode;
}

export const ListagemButton = ({
  children,
  buttonText,
  onOpen,
}: ListagemButtonProps) => {
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
      {children}
    </>
  );
};
