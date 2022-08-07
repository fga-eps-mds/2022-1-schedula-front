import { ReactNode } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { AxiosInstance } from 'axios';

import { CommonData } from '../services/DataType';

import { ListIcon } from './ListIcon';

interface ListItemProps {
  id: number;
  name: string;
  description: string;
  noAdd?: boolean;
  modalEditHeader: string;
  buttonEditModal: ReactNode;
  api: AxiosInstance;
  errorEditMessage: string;
  successEditMessage: string;
  tag: string;
  callBackEdit: (data: CommonData) => void;
  callBackDel: (delid: number) => void;
  modalAddHeader?: string;
  buttonAddModal?: ReactNode;
  errorAddMessage?: string;
  successAddMessage?: string;
  callBackAdd?: (data: CommonData) => void;
}

export const ListItem = ({
  id,
  description,
  name,
  noAdd,
  api,
  modalEditHeader,
  buttonEditModal,
  tag,
  errorEditMessage,
  successEditMessage,
  errorAddMessage,
  successAddMessage,
  buttonAddModal,
  modalAddHeader,
  callBackAdd,
  callBackEdit,
  callBackDel,
}: ListItemProps) => {
  type AddType = {
    errorAdd: string;
    successAdd: string;
    buttonAdd: ReactNode;
    modalAdd: string;
    BackAdd: (data: CommonData) => void;
  };

  const Add: AddType = {
    errorAdd: errorAddMessage !== undefined ? errorAddMessage : '',
    successAdd: successAddMessage !== undefined ? successAddMessage : '',
    buttonAdd: buttonAddModal,
    modalAdd: modalAddHeader !== undefined ? modalAddHeader : '',
    BackAdd:
      callBackAdd !== undefined
        ? callBackAdd
        : (data: CommonData) => {
            return data;
          },
  };

  return (
    <>
      <Box key={id} mt='2em'>
        <Flex w='100%'>
          <Box w='91%'>
            <Text fontSize='large'>{name}</Text>
            <Text noOfLines={1} w='85%' maxW={'50em'}>
              {description}
            </Text>
          </Box>
          <ListIcon
            noAdd={noAdd}
            api={api}
            tag={tag}
            successMessage={Add.successAdd}
            errorMessage={Add.errorAdd}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- Its not css.
            add={{
              buttonModal: Add.buttonAdd,
              modalHeader: Add.modalAdd,
              callBack: Add.BackAdd,
            }}
          >
            <VscAdd color='#405866' />
          </ListIcon>
          <ListIcon
            api={api}
            errorMessage={errorEditMessage}
            successMessage={successEditMessage}
            tag={tag}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- Its not css.
            edit={{
              buttonModal: buttonEditModal,
              modalHeader: modalEditHeader,
              callBack: callBackEdit,
              id,
              name,
              description,
            }}
          >
            <BiEditAlt />
          </ListIcon>
          <ListIcon
            noAdd={noAdd}
            api={api}
            errorMessage={errorEditMessage}
            successMessage={successEditMessage}
            tag={tag}
          >
            <RiDeleteBin6Line />
          </ListIcon>
        </Flex>
      </Box>
      <Divider mt={'1vh'} orientation='horizontal' />
    </>
  );
};
