import { Button, HStack } from '@chakra-ui/react';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';

export function Cities() {
  // const isCreateAuthorized = true;

  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const [cityToEdit, setCityToEdit] = useState<City>();

  // const {
  //   data: cities,
  //   isLoading,
  //   isValidating,
  //   mutate,
  // } = useRequest<City[]>(getCities);

  // const refresh = useCallback(
  //   (data?: City[]) =>
  //     mutate(
  //       {
  //         data: {
  //           error: null,
  //           message: '',
  //           data: data ?? [],
  //         },
  //       } as AxiosResponse<ApiResponse<City[]>>,
  //       { revalidate: !data }
  //     ),
  //   [mutate]
  // );

  // const onDelete = useCallback(
  //   (result: Result<ApiResponse<null>>, { id }: City) => {
  //     if (result.type === 'success') {
  //       toast.success(result.value?.message);

  //       const newCities = cities?.data.filter((city) => city.id !== id);
  //       refresh(newCities);

  //       return;
  //     }

  //     toast.error(result.error?.message);
  //   },
  //   [cities?.data, refresh]
  // );

  // const onEdit = useCallback(
  //   (city: City) => {
  //     setCityToEdit(city);
  //     onOpen();
  //   },
  //   [onOpen]
  // );

  // const onSubmit = useCallback(
  //   (result: Result<ApiResponse<City>>) => {
  //     if (result.type === 'error') {
  //       toast.error(result.error?.message);

  //       return;
  //     }

  //     toast.success(result.value?.message);

  //     const newCities = cityToEdit
  //       ? cities?.data.map((city) =>
  //           city.id === cityToEdit?.id ? result.value.data : city
  //         )
  //       : [...(cities?.data || []), result.value?.data];

  //     refresh(newCities);
  //     setCityToEdit(undefined);
  //     onClose();
  //   },
  //   [onClose, cityToEdit, cities?.data, refresh]
  // );

  // const handleClose = useCallback(() => {
  //   setCityToEdit(undefined);
  //   onClose();
  // }, [onClose]);

  // const renderCityItem = useCallback(
  //   (city: City) => (
  //     <CityItem city={city} onEdit={onEdit} onDelete={onDelete} />
  //   ),
  //   [onDelete, onEdit]
  // );

  return (
    <>
      <PageHeader title="Cidades Cadastradas">
        <HStack spacing={2}>
          <RefreshButton
            refresh={() =>
              new Promise((resolve) => {
                resolve(5);
              })
            }
          />
          <Button onClick={() => console.log('novo')}>Nova Cidade</Button>
        </HStack>
      </PageHeader>

      {/* <ListView<City>
         items={cities?.data}
         render={renderCityItem}
         isLoading={isLoading || isValidating}
       />

       <CityModal
         isOpen={isOpen}
         onClose={handleClose}
         onSubmit={onSubmit}
         city={cityToEdit}
       /> */}
    </>
  );
}
