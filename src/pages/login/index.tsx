import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Input,
  Text
} from "@chakra-ui/react"

interface userData {
  fullName: string
  loginName: string
  passWord: string
  confirmedPassWord: string
}

const Login: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<userData>()
  const onSubmit: SubmitHandler<userData> = (data) => console.log(data)

  return (
    <>
      <Center
        bgGradient="linear(288.94deg, #F8B86D 0%, #F49320 90.96%)"
        h="100vh"
        color="white"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            bg="white"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25), 
            0px 4px 4px rgba(0, 0, 0, 0.25), 
            0px 1px 1px rgba(0, 0, 0, 0.12), 
            0px 2px 2px rgba(0, 0, 0, 0.12), 
            0px 8px 8px rgba(0, 0, 0, 0.12);"
            color="black"
            paddingY={7}
            paddingX={20}
          >
            <Text marginBottom={12} fontSize="4xl">
              Bem-vindo
            </Text>
            <Grid
              h="400px"
              w="300px"
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(1, 1fr)"
              gap={14}
            >
              <GridItem paddingEnd={5}>
                <Box marginBottom={5}>
                  <h2>Login</h2>
                  <Input
                    {...register("fullName", {
                      required: true
                    })}
                    placeholder="E-mail ou nome de usuário"
                  />
                  {errors.fullName && (
                    <span>
                      <Text color="red.400">Este campo é obrigatório</Text>
                    </span>
                  )}
                </Box>

                <Box>
                  <h2>Senha</h2>
                  <Input
                    {...register("passWord", {
                      required: true
                    })}
                    type="password"
                    placeholder="Digite sua senha"
                  />
                  {errors.passWord && (
                    <span>
                      <Text color="red.400">Este campo é obrigatório</Text>
                    </span>
                  )}
                </Box>
              </GridItem>
            </Grid>

            <Center>
              <Button
                type="submit"
                paddingX={10}
                paddingTop={5}
                paddingBottom={5}
                borderRadius="50px"
                bg="primary"
                boxShadow="1px 4px 4px rgba(0, 0, 0, 0.25);"
                color="white"
              >
                ENTRAR
              </Button>
            </Center>
          </Box>
        </form>
      </Center>
    </>
  )
}

Login.getLayout = (page) => {
  return page
}

export default Login
