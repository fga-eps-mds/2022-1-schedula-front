import { ReactNode } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';

interface ListIconProps {
  children: ReactNode;
  type: string;
  noAdd?: boolean;
}

export const ListIcon = ({ children, type, noAdd }: ListIconProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function ModalType() {
    switch (type) {
      case 'edit':
        return <></>;

      case 'delete':
        return <></>;

      case 'add':
        return <></>;

      default:
        return <></>;
    }
  }

  return noAdd ? (
    <></>
  ) : (
    <>
      <Box
        m='0 auto'
        mt='1em'
        maxH={'20px'}
        fontSize={'xl'}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
        _hover={{ boxShadow: 'dark-lg' }}
        onClick={onOpen}
      >
        {children}
      </Box>
      <Box>{ModalType()}</Box>
    </>
  );
};
