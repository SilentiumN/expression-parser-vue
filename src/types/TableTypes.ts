import { Variable } from '@/types/VariableTypes';

export interface ItemTable {
  name: Variable['name'];
  type: Variable['type'];
  value: Variable['value'] | Variable['expression'];
}

export interface OptionSelect {
  value: 'number' | 'boolean';
  title: string;
}

export type ItemList = Map<string, ItemTable>
