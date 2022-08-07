import { CommonData } from './DataType';

export function addList(item: CommonData, data: CommonData[]) {
  data = [item, ...data];

  return data;
}
