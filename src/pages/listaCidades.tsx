import { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

import { DataCity } from '@components/DataType';
import { listCity } from '@services/testApi';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<DataCity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    listCity
      .get('/users')
      .then((res) => {
        setCidades(res.data);
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
          ml={5}
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
        <Box></Box>
      )}
    </>
  );
};

export default ListarCidades;
