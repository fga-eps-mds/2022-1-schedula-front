import { signIn } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Box, Button, Center, Input, Text } from "@chakra-ui/react"

const Login: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<credentialUser>()
  const onSubmit: SubmitHandler<credentialUser> = (data) =>
    signIn("credentials", {
      credential: data.credential,
      value: data.value,
      callbackUrl: `${window.location.origin}/account_page`
    })

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
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
            color="black"
            paddingY="20"
            paddingX="20"
          >
            <Text
              mb="39px"
              color="#605555"
              fontWeight="semibold"
              fontSize="4xl"
            >
              Bem-vindo
            </Text>
            <Box marginBottom={10}>
              <Text
                pl="5px"
                pb="8px"
                color="#605555"
                fontWeight="medium"
                fontSize="lg"
              >
                Login
              </Text>
              <Input
                size="lg"
                fontSize="lg"
                {...register("credential", { required: true })}
                placeholder="E-mail ou nome de usuário"
              />
              {errors.credential && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
            </Box>
            <Box mb="70px">
              {" "}
              <Text
                pl="5px"
                pb="8px"
                color="#605555"
                fontWeight="medium"
                fontSize="lg"
              >
                {" "}
                Senha{" "}
              </Text>
              <Input
                size="lg"
                fontSize="lg"
                {...register("value", { required: true })}
                type="password"
                placeholder="Digite sua senha"
              />
              {errors.value && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
            </Box>
            <Center>
              <Button mb="70px" type="submit" paddingX="24" width="sm">
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
