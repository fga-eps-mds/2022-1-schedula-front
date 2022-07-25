import React from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

const Cadastro: NextPage = () => {
  const [value, setValue] = React.useState('1');

  const [nomeCompleto, setNomeCompleto] =
    React.useState('');
  const [validNomeCompleto, setValidNomeCompleto] =
    React.useState(false);

  /*const handleNomeCompleto = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setNomeCompleto(event.currentTarget.value);
  };*/

  React.useEffect(() => {
    console.log(nomeCompleto);
    console.log(nomeCompleto.length);

    if (nomeCompleto.length >= 5) {
      setValidNomeCompleto(true);
    } else {
      setValidNomeCompleto(false);
    }
  }, [nomeCompleto]);

  React.useEffect(() => {
    console.log(validNomeCompleto);
  }, [validNomeCompleto]);

  return (
    <>
      <Center
        bgGradient='linear(288.94deg, #F8B86D 0%, #F78F88 90.96%)'
        h='100vh'
        color='white'>
        <Box
          className='white_box'
          bg='white'
          borderRadius='10px'
          boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25), 
            0px 4px 4px rgba(0, 0, 0, 0.25), 
            0px 1px 1px rgba(0, 0, 0, 0.12), 
            0px 2px 2px rgba(0, 0, 0, 0.12), 
            0px 8px 8px rgba(0, 0, 0, 0.12);'
          color='black'
          paddingY={7}
          paddingX={20}>
          <Text marginBottom={12} fontSize='4xl'>
            Cadastro
          </Text>
          <Grid
            h='200px'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={14}>
            <GridItem paddingEnd={5}>
              <h2>Nome completo</h2>
              <Input
                /*onChange={handleNomeCompleto}*/
                marginBottom={10}
                placeholder='Ex: Luiz Inácio'
              />
              <h2>Senha</h2>
              <Input placeholder='Digite sua senha' />
            </GridItem>
            <GridItem paddingStart={5}>
              <h2>Nome de Login</h2>
              <Input
                marginBottom={10}
                placeholder='Ex: Luiz13'
              />
              <h2>Confirmar Senha</h2>
              <Input placeholder='Digite novamente' />
            </GridItem>
          </Grid>
          <h2>Tipo de cadastro</h2>
          <RadioGroup onChange={setValue} value={value}>
            <Stack marginBottom={40} direction='row'>
              <Radio colorScheme='orange' value='1'>
                First
              </Radio>
              <Radio colorScheme='orange' value='2'>
                Second
              </Radio>
            </Stack>
          </RadioGroup>
          <Center>
            <Button
              paddingX={10}
              paddingTop={5}
              paddingBottom={5}
              borderRadius='50px'
              bg='primary'
              boxShadow='1px 4px 4px rgba(0, 0, 0, 0.25);'
              color='white'>
              REGISTRAR
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default Cadastro;
