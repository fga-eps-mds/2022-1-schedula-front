import { useEffect, useState } from 'react';

import {
  addList,
  delList,
  editList,
} from '@components/CategoriaTipos/FunctionList';
import { ListagemButtonCad } from '@components/CategoriaTipos/ListagemButtonCad';
import { ListItem } from '@components/CategoriaTipos/ListItem';
import { CommonData } from '@components/DataType';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import {
  getProblemCategories,
  IProblemCategory,
} from '@services/DetalhadorChamados';
import { listcategory } from '@services/testApi';

const ListaCategoria = () => {
  const [categorias, setCategorias] = useState<IProblemCategory[]>([]);
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
    const getData = async () => {
      const recievedData = await getProblemCategories(() => {
        setIsLoading(false);
      });
      setCategorias(recievedData);
    };

    getData();
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
          tag='/categoria/'
          callBack={Add}
          buttonModal={
            <>
              REGISTRAR CATEGORIA DE<p></p> PROBLEMA
            </>
          }
        />
      </ListagemHeader>
      {categorias?.map((item: IProblemCategory) => {
        return (
          <ListItem
            api={listcategory}
            tag={'/categoria/'}
            addTag={'/problema/'}
            goTo='/listaTipos/'
            Edit={Edit}
            modalAddHeader='Novo Tipo de Problema'
            errorAddMessage='Falha ao cadastrar Tipo de Problema!'
            successAddMessage='Tipo de Problema cadastrado com sucesso!'
            buttonAddModal={
              <>
                REGISTRAR TIPO DE<p></p> PROBLEMA
              </>
            }
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
            key={item.id}
            {...item}
          />
        );
      })}
    </Loading>
  );
};

export default ListaCategoria;
