import { useEffect, useState } from 'react';

import { ListagemBody } from '@components/ListagemBody';
import { ListagemButtonCad } from '@components/ListagemButtonCad';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import { CommonData } from '@services/DataType';
import { addList, delList, editList } from '@services/FunctionList';
import { listCity } from '@services/testApi';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<CommonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function Del(item: number) {
    setCidades(delList(item, cidades));
  }

  function Edit(item: CommonData) {
    setCidades(editList(item, cidades));
  }

  function Add(item: CommonData) {
    setCidades(addList(item, cidades));
  }

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
      <Loading isLoading={isLoading}>
        <ListagemHeader
          header='Gerenciar Cidades'
          underHeader='Lista de cidades cadastradas'
        >
          <ListagemButtonCad
            buttonText='Nova Cidade'
            modalHeader={''}
            buttonModal={undefined}
            api={listCity}
            errorMessage={''}
            successMessage={''}
            tag={'/users'}
            callBack={Add}
          />
        </ListagemHeader>
        <ListagemBody
          noAdd
          api={listCity}
          tag='/users/'
          addTag='/users/'
          data={cidades}
          modalAddHeader='Novo Tipo de Problema'
          errorAddMessage='Falha ao cadastrar Tipo de Problema!'
          successAddMessage='Tipo de Problema cadastrado com sucesso!'
          buttonAddModal={
            <>
              REGISTRAR TIPO DE<p></p> PROBLEMA
            </>
          }
          Edit={Edit}
          modalEditHeader='Editar Categoria de Problema'
          buttonEditModal={
            <>
              ATUALIZAR CATEGORIA DE<p></p> PROBLEMA
            </>
          }
          errorEditMessage={'Falha ao atualizar categoria!'}
          successEditMessage={'Categoria atualizada com sucesso!'}
          Del={Del}
          modalDelHeader='Remover Categoria De Problema'
          firstTextDel='a categoria'
          secondTextDel='e todos os Tipos de Problema reclacionados a ela'
          successDelMessage='A categoria foi removida com sucesso!'
          errorDelMessage='Falha ao remover categoria!'
        />
      </Loading>
    </>
  );
};

export default ListarCidades;
