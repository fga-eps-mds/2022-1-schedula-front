import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { ItemTipos } from '@components/ItemTipos';
import { ModalCadTipos } from '@components/ModalCadTipos';
import { listcategory, listproblemas } from '@services/testApi';

export interface Data1 {
  id: number;
  name: string;
  description: string;
  active: boolean;
  updatedAt: Date;
}

export interface TipoProblema {
  id: number;
  name: string;
  description: string;
}

type FormProps = {
  id: number;
  name: string;
  description: string;
};

const ListaTipos = () => {
  const [tipos, setTipos] = useState<Data1[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoria, nameCat] = useState<Data1>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function AddTipo(tipo: Data1) {
    setTipos([tipo, ...tipos]);
  }

  function EditTipo(tipo2: FormProps) {
    setTipos(
      tipos.map((tipo) =>
        tipo.id === tipo2.id
          ? {
              ...tipo,
              name: tipo2.name,
              description: tipo2.description,
            }
          : { ...tipo }
      )
    );
  }

  function DelTipo(delid: number) {
    setTipos(tipos.filter((tipo) => tipo.id !== delid));
  }

  const router = useRouter();
  useEffect(() => {
    listproblemas
      .get('/users/' + router.query.id)
      .then((res) => {
        setTipos(res.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, [router.query.id]);

  useEffect(() => {
    listcategory
      .get('/users/' + router.query.id)
      .then((res) => {
        nameCat(res.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, [router.query.id]);

  return (
    <>
      {isLoading ? (
        <Box
          w={'100%'}
          verticalAlign={'90px'}
          alignContent={'center'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'0 auto'}
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            mt={'30%'}
            ml={'40%'}
          />
        </Box>
      ) : (
        <Box w='100%'>
          <Box width='100%' display='flex'>
            <Flex align='center' justify='left' w='100%' h='5%' mr={10} mt='2%'>
              <Heading
                margin='0 auto'
                marginLeft={0}
                size='lg'
                textAlign='center'
              >
                {' '}
                {categoria != undefined
                  ? 'Gerenciar ' + categoria.name
                  : 'Gerenciar Problema'}
              </Heading>
            </Flex>
            <Flex
              align='center'
              justify='right'
              w='100%'
              h='5%'
              mr={10}
              mt='2%'
            >
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
                  NOVO TIPO DE PROBLEMA
                </Text>
              </Button>
              <ModalCadTipos
                callBack={AddTipo}
                isOpen={isOpen}
                onClose={onClose}
              />
            </Flex>
          </Box>
          <Box mt='1em' mb='3em'>
            <Text>Problemas cadastrados no sitema.</Text>
            {
              //o map só pode listar se tiver com o active == true, não faz isso agora pq a api não existe.
            }
            {tipos?.map((tipo: Data1) => {
              // tipo.active === true ?
              return (
                <ItemTipos
                  key={tipo.id}
                  callBackEdit={EditTipo}
                  callBackDel={DelTipo}
                  {...tipo}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ListaTipos;
