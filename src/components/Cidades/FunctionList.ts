import { DataCity } from '../DataType';

export function addList(item: DataCity, data: DataCity[]) {
  data = [item, ...data];

  return data;
}

export function editList(item: DataCity, data: DataCity[]) {
  data = data.map((data2) =>
    item.id === data2.id
      ? {
          ...data2,
          name: item.name,
        }
      : { ...data2 }
  );

  return data;
}

export function delList(delId: number, data: DataCity[]) {
  data = data.filter((data2) => data2.id !== delId);

  return data;
}
