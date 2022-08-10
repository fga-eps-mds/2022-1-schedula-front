import { ReactNode } from 'react';
import Link from 'next/link';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

import { DataCity, ListCityProps } from '../DataType';

import { ListIcon } from './ListIcon';

export const ListItem = ({
  id,
  name,
  noAdd,
  api,
  goTo,
  addTag,
  modalEditHeader,
  buttonEditModal,
  tag,
  errorEditMessage,
  successEditMessage,
  errorAddMessage,
  successAddMessage,
  buttonAddModal,
  modalAddHeader,
  firstTextDel,
  secondTextDel,
  modalDelHeader,
  errorDelMessage,
  successDelMessage,
  Add,
  Edit,
  Del,
}: ListCityProps) => {
  type AddType = {
    AddTag: string;
    errorAdd: string;
    successAdd: string;
    buttonAdd: ReactNode;
    modalAdd: string;
    BackAdd: (data: DataCity) => void;
  };

  const AddTp: AddType = {
    AddTag: addTag !== undefined ? addTag : '',
    errorAdd: errorAddMessage !== undefined ? errorAddMessage : '',
    successAdd: successAddMessage !== undefined ? successAddMessage : '',
    buttonAdd: buttonAddModal,
    modalAdd: modalAddHeader !== undefined ? modalAddHeader : '',
    BackAdd:
      Add !== undefined
        ? Add
        : (data: DataCity) => {
            return data;
          },
  };

  return (
    <>
      <Box key={id} mt='2em'>
        <Flex w='100%'>
          {goTo ? (
            <Link href={goTo + '?id=' + id} passHref>
              <Box w='91%'>
                <Text fontSize='large'>{name}</Text>
              </Box>
            </Link>
          ) : (
            <Box w='91%'>
              <Text fontSize='large'>{name}</Text>
            </Box>
          )}
          <ListIcon
            noAdd={noAdd}
            api={api}
            tag={AddTp.AddTag}
            successMessage={AddTp.successAdd}
            errorMessage={AddTp.errorAdd}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- Its not css.
            add={{
              buttonModal: AddTp.buttonAdd,
              modalHeader: AddTp.modalAdd,
              callBack: AddTp.BackAdd,
              parentId: id,
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
              callBack: Edit,
              id,
              name,
            }}
          >
            <BiEditAlt />
          </ListIcon>
          <ListIcon
            api={api}
            tag={tag}
            errorMessage={errorDelMessage}
            successMessage={successDelMessage}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- Its not css.
            delete={{
              fistText: firstTextDel,
              id,
              modalHeader: modalDelHeader,
              name,
              secondText: secondTextDel,
              callBack: Del,
            }}
          >
            <RiDeleteBin6Line />
          </ListIcon>
        </Flex>
      </Box>
      <Divider mt={'1vh'} orientation='horizontal' />
    </>
  );
};
