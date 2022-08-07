import { useEffect, useState } from 'react';

import { ListagemBody } from '@components/ListagemBody';
import { ListagemButton } from '@components/ListagemButton';
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
        <ListagemButton
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
      <ListagemBody data={categorias} Del={Del} Edit={Edit} />
    </Loading>
  );
};

export default ListaCategoria;
