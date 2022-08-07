import { toast } from 'react-toastify';

import { RequestProps } from './DataType';

export const EditRequest = async ({
  data,
  api,
  errorMessage,
  successMessage,
  tag,
  callBack,
}: RequestProps) => {
  api
    .put(tag + data.id, data)
    .then(() => {
      toast.success(successMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
      console.log(data.id);
      callBack(data);
    })
    .catch(() => {
      toast.warning(errorMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
    });
};
