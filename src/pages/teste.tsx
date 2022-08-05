import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { DataCategory } from '@components/DataType';
import { ModalCadType } from '@components/ModalCadType';

const Teste = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categorias, setCategorias] = useState<
    DataCategory[]
  >([]);

  return (
    <>
      <Heading w='100%'>Página Teste</Heading>
      <Button onClick={onOpen}>Teste Modal Cad.</Button>
      <ModalCadType
        isOpen={isOpen}
        onClose={onClose}
        categoryId={2}
      />
      <Box mt='1em' mb='3em'>
        <Text>Tipos cadastrados no sitema.</Text>
        {
          //o map só pode listar se tiver com o active == true, não faz isso agora pq a api não existe.
        }
        {categorias?.map((categoria: DataCategory) => {
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

export default teste;
