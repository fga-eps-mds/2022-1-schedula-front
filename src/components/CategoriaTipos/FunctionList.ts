import { CommonData } from './DataType';

export function addList(item: CommonData, data: CommonData[]) {
  data = [item, ...data];

  return data;
}

export function editList(item: CommonData, data: CommonData[]) {
  data = data.map((data2) =>
    item.id === data2.id
      ? {
          ...data2,
          name: item.name,
          description: item.description,
        }
      : { ...data2 }
  );

  return data;
}

export function delList(delId: number, data: CommonData[]) {
  data = data.filter((data2) => data2.id !== delId);

  return data;
}
