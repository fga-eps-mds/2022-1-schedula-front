import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';

interface UserFormProps {
  defaultValues?: User | undefined;
  onSubmit: (data: CreateUserPayload) => void;
}

export const UserForm = ({ defaultValues, onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserPayload>({
    defaultValues: {
      ...defaultValues,
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Object.keys(errors).length > 0} mb={8}>
        <Stack spacing={8}>
          <Flex gap={8}>
            <Box w='100%'>
              <FormLabel htmlFor='name'>Nome Completo</FormLabel>
              <Input
                {...register('name', { required: 'Campo obrigatório' })}
                placeholder='Nome completo'
                variant='flushed'
              />
              {errors?.name && (
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              )}
            </Box>

            <Box w='100%'>
              <FormLabel htmlFor='username'>Nome de Usuário</FormLabel>
              <Input
                {...register('username', { required: 'Campo obrigatório' })}
                placeholder='Nome de Usuário'
                variant='flushed'
              />
              {errors?.username && (
                <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
              )}
            </Box>
          </Flex>

          <Box>
            <FormLabel htmlFor='email'>E-mail</FormLabel>
            <Input
              {...register('email', { required: 'Campo obrigatório' })}
              placeholder='Descrição'
              variant='flushed'
            />
            {errors?.email && (
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            )}
          </Box>

          <Flex gap={8}>
            <Box w='100%'>
              <FormLabel htmlFor='password'>Senha</FormLabel>
              <Input
                type='password'
                {...register('password', { required: 'Campo obrigatório' })}
                placeholder='Senha'
                variant='flushed'
              />
              {errors?.password && (
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              )}
            </Box>

            <Box w='100%'>
              <FormLabel htmlFor='confirmPassword'>Confirmar Senha</FormLabel>
              <Input
                type='password'
                {...register('confirmPassword', {
                  required: 'Campo obrigatório',
                  validate: (value) =>
                    value === watch('password') || 'Senhas não conferem',
                })}
                placeholder='Confirmar Senha'
                variant='flushed'
              />
              {errors?.confirmPassword && (
                <FormErrorMessage>
                  {errors?.confirmPassword?.message}
                </FormErrorMessage>
              )}
            </Box>
          </Flex>

          <Flex gap={8}>
            <Box width='100%'>
              <FormLabel htmlFor='acess'>Acesso</FormLabel>
              <Select
                {...register('acess', {
                  required: 'Campo obrigatório',
                })}
                defaultValue=''
                variant='flushed'
              >
                <option disabled value=''>
                  Escolha um Acesso
                </option>
                <option value='basic'>Basico</option>
                <option value='manager'>Gerente</option>
                <option value='admin'>Administrador</option>
              </Select>
              {errors?.acess && (
                <FormErrorMessage>{errors?.acess?.message}</FormErrorMessage>
              )}
            </Box>

            <Box width='100%'>
              <FormLabel htmlFor='job_role'>Cargo</FormLabel>
              <Input
                {...register('job_role', { required: 'Campo obrigatório' })}
                placeholder='Cargo'
                variant='flushed'
              />
              {errors?.job_role && (
                <FormErrorMessage>{errors?.job_role?.message}</FormErrorMessage>
              )}
            </Box>
          </Flex>
        </Stack>
      </FormControl>

      <Button type='submit' width='100%' isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  );
};
