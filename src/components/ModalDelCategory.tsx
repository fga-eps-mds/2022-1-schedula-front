import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { listcategory } from '@services/testApi';

interface DelCategoryProps {
  id: number;
  name: string;
  callBackDel: (Delid: number) => void;
}

export const ModalDelCategory = ({
  id,
  name,
  callBackDel,
}: DelCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  function DeleteCategory() {
    const del = {
      active: false,
      body: 'active',
    };
    listcategory
      .put('/users/' + id, del)
      .then(() => {
        toast.success(
          'A categoria ' + name + ' foi desativada',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );
        callBackDel(id);
      })
      .catch(() => {
        toast.warning('Falha ao desativar categoria!', {
          position: 'top-left',
          autoClose: 2000,
        });
      });
    //Teria + uma api de deleção dos tipos logo abaixo desta.
  }

  return (
    <>
      <Box fontFamily={'Overpass ,sans-serif'}>
        <Box
          m='0 auto'
          mt='1em'
          maxH={'20px'}
          fontSize={'xl'}
          onClick={onOpen}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
          _hover={{ boxShadow: 'dark-lg' }}
        >
          <RiDeleteBin6Line />
        </Box>

        <AlertDialog
          size={'2xl'}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                fontSize='3xl'
                fontWeight='bold'
                m={'0 auto'}
                fontFamily={'Overpass ,sans-serif'}
              >
                Remover Categoria de Problema
              </AlertDialogHeader>

              <AlertDialogBody>
                <Text
                  w='60%'
                  m={'0 auto'}
                  textAlign={'justify'}
                  fontSize={'md'}
                  fontFamily={'Overpass ,sans-serif'}
                >
                  Você está prestes a remover a categoria
                  {' ' + name + ' '} e todos os tipos de
                  problemas relacionados a ela. Tem certeza
                  disso?
                </Text>
              </AlertDialogBody>

              <AlertDialogFooter
                fontFamily={'Overpass ,sans-serif'}
                justifyContent={'center'}
                mt={'30px'}
              >
                <Button
                  ref={cancelRef}
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
                  onClick={DeleteCategory}
                  ml={5}
                  fontSize={'18px'}
                  borderRadius={'50px'}
                  maxH={'35px'}
                  w={'250px'}
                >
                  SIM, TENHO CERTEZA
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
};