import { toast } from 'react-toastify';

import { CadRequestProps } from '../services/DataType';

export const CadRequest = async ({
  data,
  api,
  errorMessage,
  successMessage,
  tag,
  reset,
  callBack,
}: CadRequestProps) => {
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
