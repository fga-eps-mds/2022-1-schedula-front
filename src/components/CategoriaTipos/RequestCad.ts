import { toast } from 'react-toastify';

import { DataProbType, RequestTiposProps } from '../DataType';

export const CadRequest = async ({
  data,
  api,
  errorMessage,
  successMessage,
  tag,
  reset,
  callBack,
}: RequestTiposProps) => {
  api
    .post(tag, data)
    .then(() => {
      toast.success(successMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
      callBack(data);
      reset();
    })
    .catch(() => {
      toast.warning(errorMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
    });
};

export const AddRequest = async ({
  data,
  api,
  errorMessage,
  successMessage,
  tag,
  reset,
  callBack,
}: RequestTiposProps) => {
  const data2: DataProbType = {
    name: data.name,
    description: data.description,
    category_id: data.parentId,
  };
  api
    .post(tag, data2)
    .then(() => {
      toast.success(successMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
      callBack(data);
      reset();
    })
    .catch((error) => {
      toast.warning(errorMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
      console.log(error);
    });
};
