import {
  defineStore,
} from 'pinia';
import { dataForUpdateVariable, Variable, VariableList } from '@/types/VariableTypes';
import { State } from '@/types/StateTypes';

// eslint-disable-next-line import/prefer-default-export
export const useCounterStore = defineStore('counter', {
  state: (): State => ({
    variable: new Map<string, Variable>() as VariableList,
  }),
  getters: {

    computedVariables: (state) => {
      const items = new Map<string, Variable>() as VariableList;

      state.variable.forEach((value, key) => {
        if (value.computedVariable) {
          items.set(key, value);
        }
      });

      return items;
    },

  },
  actions: {

    addVariable(isComputedVariable: boolean) {
      const uuid = Math.random().toString(16).slice(2);
      const newVariable = {
        name: uuid,
        type: 'boolean',
        computedVariable: isComputedVariable,
        value: true,
      } as Variable;

      if (isComputedVariable) {
        newVariable.expression = '';
      }

      this.$patch(() => {
        this.variable.set(uuid, newVariable);
      });
    },

    getVariableById(id: string) {
      return this.variable.get(id);
    },

    updateVariable(id: string, data: dataForUpdateVariable) {
      const currentVariable = this.getVariableById(id);

      if (currentVariable) {
        const newDataForVariable = {
          ...currentVariable,
          ...data,
        };

        this.$patch(() => {
          this.variable.set(id, newDataForVariable);
        });
      }
    },

    deleteVariable(id: string) {
      const currentVariable = this.getVariableById(id);

      if (currentVariable) {
        this.variable.delete(id);
      }
    },

  },
});
