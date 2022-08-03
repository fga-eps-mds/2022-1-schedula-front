import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { ItemTipos } from '@components/ItemTipos';
import { ModalCadTipos } from '@components/ModalCadTipos';
import { listproblemas } from '@services/testApi';

import DefaultLayout from '../layout/DefaultLayout';

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

  useEffect(() => {
    listproblemas
      .get('/users')
      .then((res) => {
        setTipos(res.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
          <Box
            width='100%'
            display='flex'
            marginTop='6%'
            fontFamily='Overpass ,sans-serif'
          >
            <Flex
              align='center'
              justify='left'
              w='60%'
              h='5%'
              mr={10}
              mt='2%'
            >
              <Heading
                margin='0 auto'
                marginLeft={0}
                size='lg'
                textAlign='center'
                fontFamily='Overpass ,sans-serif'
              >
                Gerenciar {' ' + name}
              </Heading>
            </Flex>
            <ModalCadTipos callBack={AddTipo} />
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

ListaTipos.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='gerenciarTiposDeChamado'>
      {page}
    </DefaultLayout>
  );
};

export default ListaTipos;
