type ApiResponse<Data> = { data: Data; error: null | string; message: string };

type ServiceStatus = {
  APP: string;
};

type SelectOption<Value = number> = {
  label: string;
  value: Value;
};
