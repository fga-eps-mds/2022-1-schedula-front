import { toast } from 'react-toastify';

import { RequestDelProps } from '@components/DataType';

export const DelRequest = async ({
  id,
  api,
  errorMessage,
  successMessage,
  tag,
  callBack,
  onClose,
}: RequestDelProps) => {
  api
    .delete(tag + id)
    .then(() => {
      toast.success(successMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
      callBack(id);
      onClose();
    })
    .catch(() => {
      toast.warning(errorMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
    });
};
