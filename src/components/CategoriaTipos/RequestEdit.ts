import { toast } from 'react-toastify';

import { RequestTiposProps } from '@components/DataType';

export const EditRequest = async ({
  data,
  api,
  errorMessage,
  successMessage,
  tag,
  callBack,
  onClose,
}: RequestTiposProps) => {
  api
    .put(tag + data.id, data)
    .then(() => {
      toast.success(successMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
      callBack(data);
      onClose();
    })
    .catch(() => {
      toast.warning(errorMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
    });
};
