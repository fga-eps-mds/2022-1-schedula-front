import { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Data1 } from '@components/DataType';
import { ModalCadType } from '@components/ModalCadType';

import DefaultLayout from '../layout/DefaultLayout';

const Teste = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categorias, setCategorias] = useState<Data1[]>([]);

  function callBack(categoria: Data1) {
    setCategorias([categoria, ...categorias]);
  }

  return (
    <>
      <Heading w='100%'>Página Teste</Heading>
      <Button onClick={onOpen}>Teste Modal Cad.</Button>
      <ModalCadType
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        callBack={callBack}
      />
      <Box mt='1em' mb='3em'>
        <Text>Tipos cadastrados no sitema.</Text>
        {
          //o map só pode listar se tiver com o active == true, não faz isso agora pq a api não existe.
        }
        {categorias?.map((categoria: Data1) => {
          // categoria.active === true ?
          return (
            <>
              <Text>{categoria.name}</Text>
              <Text>{categoria.description}</Text>
            </>
          );
        })}
      </Box>
    </>
  );
};

Teste.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='dashboard'>{page}</DefaultLayout>
  );
};

export default Teste;
