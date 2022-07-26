import React from 'react';
import type { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
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

interface userData {
  fullName: string;
  loginName: string;
  passWord: string;
  confirmedPassWord: string;
}

const Cadastro: NextPage = () => {
  const [value, setValue] = React.useState('1');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>();
  const onSubmit: SubmitHandler<userData> = (data) =>
    console.log(data);

  return (
    <>
      <Center
        bgGradient='linear(288.94deg, #F8B86D 0%, #F78F88 90.96%)'
        h='100vh'
        color='white'>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Box marginBottom={5}>
                  <h2>Nome completo</h2>
                  <Input
                    {...register('fullName', {
                      required: true,
                    })}
                    placeholder='Ex: Luiz Inácio'
                  />
                  {errors.fullName && (
                    <span>
                      <Text color='red.400'>
                        Este campo é obrigatório
                      </Text>
                    </span>
                  )}
                </Box>

                <Box>
                  <h2>Senha</h2>
                  <Input
                    {...register('passWord', {
                      required: true,
                    })}
                    type='password'
                    placeholder='Digite sua senha'
                  />
                  {errors.passWord && (
                    <span>
                      <Text color='red.400'>
                        Este campo é obrigatório
                      </Text>
                    </span>
                  )}
                </Box>
              </GridItem>
              <GridItem paddingStart={5}>
                <Box marginBottom={5}>
                  <h2>Nome de Login</h2>
                  <Input
                    {...register('loginName', {
                      required: true,
                    })}
                    placeholder='Ex: Luiz13'
                  />
                  {errors.loginName && (
                    <span>
                      <Text color='red.400'>
                        Este campo é obrigatório
                      </Text>
                    </span>
                  )}
                </Box>
                <Box>
                  <h2>Confirmar Senha</h2>
                  <Input
                    {...register('confirmedPassWord', {
                      required: true,
                    })}
                    type='password'
                    placeholder='Digite novamente'
                  />
                  {errors.confirmedPassWord && (
                    <span>
                      <Text color='red.400'>
                        Este campo é obrigatório
                      </Text>
                    </span>
                  )}
                </Box>
              </GridItem>
            </Grid>
            <Box>
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
            </Box>

            <Center>
              <Button
                /*</Center>onClick={verificador}*/
                type='submit'
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
        </form>
      </Center>
    </>
  );
};

export default Cadastro;
