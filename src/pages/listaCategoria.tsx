import { useEffect, useState } from 'react';

import { ListagemBody } from '@components/ListagemBody';
import { ListagemButtonCad } from '@components/ListagemButtonCad';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import { CommonData } from '@services/DataType';
import { addList, delList, editList } from '@services/FunctionList';
import { listcategory } from '@services/testApi';

const ListaCategoria = () => {
  const [categorias, setCategorias] = useState<CommonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function Del(item: number) {
    setCategorias(delList(item, categorias));
  }

  function Edit(item: CommonData) {
    setCategorias(editList(item, categorias));
  }

  function Add(item: CommonData) {
    setCategorias(addList(item, categorias));
  }

  useEffect(() => {
    listcategory
      .get('/users')
      .then((res) => {
        setCategorias(res.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Loading isLoading={isLoading}>
      <ListagemHeader
        header='Gerenciar Categorias de Problema'
        underHeader='Lista de categorias cadastradas'
      >
        <ListagemButtonCad
          buttonText='Nova Categoria De Problema'
          modalHeader='Nova Categoria de Problema'
          successMessage='A categoria foi cadastrada com sucesso!'
          errorMessage='Não foi possível cadastrar a categoria!'
          api={listcategory}
          tag='/users'
          callBack={Add}
          buttonModal={
            <>
              REGISTRAR CATEGORIA DE<p></p> PROBLEMA
            </>
          }
        />
      </ListagemHeader>
      <ListagemBody
        api={listcategory}
        tag='/users/'
        addTag='/users/'
        goTo='/listaTipos'
        data={categorias}
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
  );
};

export default ListaCategoria;
