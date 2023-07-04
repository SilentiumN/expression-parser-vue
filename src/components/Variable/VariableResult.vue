<script lang="ts" setup>
import { defineProps } from 'vue';
import { resultVariable, resultVariableList } from '@/types/VariableTypes';
import TableInput from '@/components/TableItem/TableInput.vue';
import TableSelect from '@/components/TableItem/TableSelect.vue';
import TableEmpty from '@/components/TableItem/TableEmpty.vue';
import TableText from '@/components/TableItem/TableText.vue';

export interface Props {
  computedVariable: resultVariableList;
  initialVariable: resultVariableList;
}

const props = defineProps<Props>();

const selectComponent = (id: string, variable: resultVariable) => {
  let component = TableEmpty;

  if (variable.computedVariable) {
    component = TableText;
  }
  if (!variable.computedVariable && variable.type === 'number') {
    component = TableInput;
  }
  if (!variable.computedVariable && variable.type === 'boolean') {
    component = TableSelect;
  }

  return component;
};

const selectProps = (id: string, variable: resultVariable) => {
  let currentProps = {};

  if (!variable.computedVariable && variable.type === 'boolean') {
    currentProps = {
      options: [
        {
          value: true,
          title: 'Да',
        },
        {
          value: false,
          title: 'Нет',
        },
      ],
      default: variable.value,
      unselectedText: 'Выберите значение',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onInput: () => {
      },
    };
  }

  if (!variable.computedVariable && variable.type === 'number') {
    currentProps = {
      name: `input-${variable.name}-${Math.random()}`,
      type: 'number',
      value: variable.value,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange: () => {
      },
    };
  }

  if (variable.computedVariable) {
    currentProps = {
      text: variable.value,
    };
  }

  return currentProps;
};
</script>

<template>
  <div
    class="variable-result"
  >
    <div
      class="variable-result__column"
    >
      <div
        v-for="[id, resultVariable] in initialVariable"
        :key="id"
      >
        <div>
          {{ resultVariable.name }}
        </div>
        <component
          :is="selectComponent(id, resultVariable)"
          v-bind="selectProps(id, resultVariable)"
        />
      </div>
    </div>

    <div
      class="variable-result__column"
    >
      <div
        v-for="[id, resultVariable] in computedVariable"
        :key="id"
      >
        <div>
          {{ resultVariable.name }}
        </div>
        <component
          :is="selectComponent(id, resultVariable)"
          v-bind="selectProps(id, resultVariable)"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
