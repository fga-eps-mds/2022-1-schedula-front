import { toast } from 'react-toastify';

import { RequestCityProps } from '../DataType';

export const CadRequest = async ({
  data,
  api,
  errorMessage,
  successMessage,
  tag,
  reset,
  callBack,
}: RequestCityProps) => {
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
}: RequestCityProps) => {
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
    .catch((error) => {
      toast.warning(errorMessage, {
        position: 'top-left',
        autoClose: 2000,
      });
      console.log(error);
    });
};

export const EditRequest = async ({
  data,
  api,
  errorMessage,
  successMessage,
  tag,
  callBack,
  onClose,
}: RequestCityProps) => {
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
