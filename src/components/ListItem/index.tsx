import React, { useCallback, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

type ListItemProps = {
  title: string | JSX.Element;
  description: string | JSX.Element;
  Actions?: typeof Actions;
  children?: React.ReactNode;
};

export const Divider = {
  content: "''",
  position: 'absolute',
  bottom: 0,
  width: '40%',
  height: '1px',
  backgroundColor: '#e6e6e6',
};

export const ListItem = ({ title, description, children }: ListItemProps) => {
  return (
    <>
      <Flex
        w='100%'
        justifyContent='space-between'
        align='center'
        position='relative'
        _after={Divider}
      >
        <Box>
          <Text fontWeight='semibold' mb={1}>
            {title}
          </Text>
          <Text color='GrayText'>{description}</Text>
        </Box>

        <Box alignSelf='end'>{children}</Box>
      </Flex>
    </>
  );
};

interface ActionsProps {
  itemName: string;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  onAdd?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  itemName,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(() => {
    setIsLoading(true);
    onDelete?.()?.then(() => setIsLoading(false));
    onClose?.();
  }, [onClose, onDelete]);

  return (
    <HStack spacing={4}>
      {onAdd && (
        <Tooltip
          label='Tipos de Problema'
          placement='top'
          bg='blackAlpha.100'
          color='black'
          openDelay={250}
        >
          <IconButton
            aria-label='Add'
            onClick={onAdd}
            icon={<MdLibraryAdd cursor='pointer' size={24} />}
            variant='solid'
          />
        </Tooltip>
      )}

      <Tooltip
        label={`Editar ${itemName}`}
        placement='top'
        bg='whiteAlpha.200'
        color='black'
        openDelay={250}
      >
        <IconButton
          aria-label='Edit'
          onClick={onEdit}
          icon={<BiEditAlt cursor='pointer' size={24} />}
          variant='solid'
        />
      </Tooltip>

      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement='auto'
      >
        <Tooltip
          label={`Apagar ${itemName}`}
          placement='top'
          bg='red.300'
          color='black'
          openDelay={250}
        >
          <Box>
            <PopoverTrigger>
              <IconButton
                aria-label='Delete'
                icon={<FaTrash />}
                color='red.600'
                variant='solid'
                isLoading={isLoading}
              />
            </PopoverTrigger>
          </Box>
        </Tooltip>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <Heading size='md'>Apagar {itemName}</Heading>
          </PopoverHeader>
          <PopoverBody>
            Você realmente deseja excluir <strong>{itemName}</strong>?
          </PopoverBody>
          <PopoverFooter>
            <Flex justifyContent='space-between'>
              <Button onClick={onClose} variant='outline'>
                Cancelar
              </Button>
              <Button onClick={handleDelete} colorScheme='red' variant='solid'>
                Apagar
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

ListItem.Actions = Actions;
