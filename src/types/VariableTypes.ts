export interface Variable {
  name: string;
  computedVariable: boolean;
  type: 'boolean' | 'number' | null;
  value: number|boolean|undefined|null;
  expression?: string;
}

export interface dataForUpdateVariable {
  name?: Variable['name'];
  type?: Variable['type'];
  value?: Variable['value'];
  expression?: Variable['expression'];
}

export interface resultVariable {
  name: Variable['name'];
  computedVariable: Variable['computedVariable'];
  type: Variable['type'];
  value: Variable['value']
}

export type VariableList = Map<string, Variable>

export type resultVariableList = Map<string, resultVariable>
