import { useState } from 'react';

import { addList, delList, editList } from '@components/Cidades/FunctionList';
import { DataCity } from '@components/DataType';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<DataCity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function Del(item: number) {
    setCidades(delList(item, cidades));
  }

  function Edit(item: DataCity) {
    setCidades(editList(item, cidades));
  }

  function Add(item: DataCity) {
    setCidades(addList(item, cidades));
  }

  //   useEffect(() => {
  //     listCity
  //       .get('/users')
  //       .then((res) => {
  //         setCidades(res.data);
  //       })
  //       .catch()
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }, []);

  return <></>;
};

export default ListarCidades;
